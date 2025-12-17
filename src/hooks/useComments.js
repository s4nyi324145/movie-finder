import { useEffect, useState } from "react";

export default function useComments(id) {
    
    const [comments, setComments] = useState([]);
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState();
    const token = localStorage.getItem("token");

  async function loadComments() {

       
        try {
            const response = await fetch(`http://localhost:5500/comments/${id}`);
            if(!response.ok) throw new Error("Cant fetch comments")
            const data = await response.json();
            console.log(data)
            setComments(data)

        } catch (error) {
            setError(error.message)
        }
        finally{setLoading(false)}
   }

  async function addComment({comment, title}) {
    if (comment.trim() === "") {
      setAdding(false)
      return
    }
    
    const token = localStorage.getItem("token");

     try {
        const response = await fetch("http://localhost:5500/comments/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              comment: comment,
              movie_id: id,
              movie_title: title 
            }),
          });
      
          const data = await response.json();

          if(!response.ok) throw new Error(data.message || "Error adding comment")
          await loadComments()
          return {success: true}
     } catch (error) {
        setError(error.message)
        return {success: false, message: error.message}
     }
  };

  async function deleteComment({commentId}) {

    try {
        const res = await fetch(`http://localhost:5500/comments/${commentId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error deleting comment");
        setComments(prev => prev.filter(c => c.comment_id !== commentId));
        return { success: true };
      } catch (err) {
        return { success: false, message: err.message };
      }
  }

  async function editComment({commentId, newComment}){
    try {
        const response = await fetch(`http://localhost:5500/comments/${commentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: newComment }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error editing comment");
        setComments(prev =>
          prev.map(c => (c.comment_id === commentId ? { ...c, comment: newComment } : c))
        );
        return { success: true };
      } catch (err) {
        return { success: false, message: err.message };
      }
  }

  async function likeComment(commentId){
    try {
      const response = await fetch(`http://localhost:5500/comments/commentlike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment_id: commentId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error liking comment");
      setComments(prev =>
        prev.map(c => (c.comment_id === commentId ? { ...c, comment_like: c.comment_like + 1 } : c))
      );
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }

  }

  async function dislikeComment({commentId}){
    try {
      const response = await fetch(`http://localhost:5500/comments/commentdislike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment_id: commentId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error disliking comment");
      setComments(prev =>
        prev.map(c => (c.comment_id === commentId ? { ...c, comment_dislike: c.comment_dislike + 1 } : c))
      );
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }

  }

   useEffect(() => {loadComments()}, [id])

   return{comments,error,loading, addComment, editComment, deleteComment, likeComment,dislikeComment }

}