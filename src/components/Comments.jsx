import { useEffect, useState } from "react";
import "../style/comments.css"

export default function Comments({id, title}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [adding, setAdding] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("username"));
  const [token, setToken] = useState(localStorage.getItem("token"));


  async function loadComments() {
        try {
            
            const response = await fetch(`http://localhost:5500/comments/${id}`);
            const data = await response.json();
            console.log(data)
            setComments(data)

        } catch (error) {
            alert(error)
        }
  }

  const handleAddClick = () => {
    setAdding(true);
  };

  useEffect(() => {loadComments()},[id])

 const handleSubmit = async () => {
        if (newComment.trim() === "") return;
    
        const token = localStorage.getItem("token");
    
        const response = await fetch("http://localhost:5500/comments/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment: newComment,
            movie_id: id,
            movie_title: title 
          }),
        });
    
        const data = await response.json();
        if (response.ok) {
          setNewComment("");
          setAdding(false);
          await loadComments();
        } else {
          alert(data.message || "Error adding comment");
        }
      };


    return(<>
    
    <div className="comments">
  <h2 className="comments-title">Comments</h2>

  <div className="comments-wrapper">
    {comments.length === 0 && (
      <p className="no-comments">No comments yet. Be the first!</p>
    )}

    {comments.map((c) => {
      const date = new Date(c.date).toLocaleDateString("hu-HU");


      return (
        <div key={c.comment_id} className="comment-card">
          <div className="comment-header">
          <span className={`comment-user ${c.username === userName ? "my-comment-user" : ""}`}>{c.username}</span>
            <span className="comment-date">{date}</span>
          </div>
          <p className="comment-text">{c.comment}</p>
        </div>
      );
    })}

  </div>

  {adding ? (
    <div className="add-comment-box">
      <textarea 
        placeholder="Write your comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <div className="buttons">
        <button className="btn submit-btn" onClick={handleSubmit}>Submit</button>
        <button className="btn-close-submit" onClick={() => setAdding(false)}>X</button>
      </div>
    </div>
  ) : (
  
      <button className="btn add-btn" onClick={handleAddClick}>
      + Add Comment
      </button>
      
  
  )}
</div>

    </>)
}