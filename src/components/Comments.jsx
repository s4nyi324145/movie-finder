import { useState } from "react";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useComments from "../hooks/useComments";
import "../style/comments.css";

export default function Comments({ id, title }) {
  const [newComment, setNewComment] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const username = localStorage.getItem("username");


  const { comments, error, loading, addComment, deleteComment, editComment} = useComments(id);

  const handleAddClick = () => setAdding(true);

  const handleSubmit = async () => {
    const result = await addComment({ comment: newComment, title });
    if (result.success) {
      setNewComment("");
      setAdding(false);
    } else {
      console.log(result.message);
    }
  };

  const handleDelete = async (comment_id) => {
    await deleteComment({ commentId: comment_id });
  };

  const handleEdit = async (comment_id) => {
    await editComment({ commentId: comment_id, newComment: editText });
    setEditingCommentId(null);
  };






  return (
    <div className="comments">
      <h2 className="comments-title">Comments</h2>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="comments-wrapper">
        {comments.length === 0 && <p className="no-comments">No comments yet. Be the first!</p>}

        {comments.map((c) => {
          const date = new Date(c.date).toLocaleDateString("hu-HU");
          const isEditing = editingCommentId === c.comment_id;

          return (
            <div key={c.comment_id} className="comment-card">
              <div className="comment-header">
                <span className={`comment-user ${c.username === username ? "my-comment-user" : ""}`}>
                  {c.username}
                </span>
                <span className="comment-date">{date}</span>
              </div>

              {isEditing ? (
                <div className="edit-comment-box">
                  <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
                  <div className="comment-buttons">
                    <button className="save" onClick={() => handleEdit(editingCommentId)}>Save</button>
                    <button className="cancel" onClick={() => setEditingCommentId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="comment-text">{c.comment}</p>
                  {c.username === username && (
                    <>
                      <div className="comment-buttons">
                      <button onClick={() => handleDelete(c.comment_id)} className="delete"><FontAwesomeIcon icon={faTrash} /></button>
                      <button onClick={() => { setEditingCommentId(c.comment_id); setEditText(c.comment); }} className="edit"><FontAwesomeIcon icon={faPen}/></button>
                      </div>
                   
                    
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {adding ? (
        <div className="add-comment-box">
          <textarea placeholder="Write your comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <div className="buttons">
            <button className="btn submit-btn" onClick={handleSubmit}>Submit</button>
            <button className="btn-close-submit" onClick={() => setAdding(false)}>X</button>
          </div>
        </div>
      ) : (
        <button className="btn add-btn" onClick={handleAddClick}>+ Add Comment</button>
      )}
    </div>
  );
}
