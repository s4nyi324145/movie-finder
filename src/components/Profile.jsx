import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/profile.css";

export default function Profile() {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");

  async function getUserComments() {
    try {
      const result = await fetch(`http://localhost:5500/comments/users/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await result.json();
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!token) return navigate("/login");
    getUserComments();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Welcome, {username || "User"}!</h1>
        <p>Your saved comments:</p>
      </div>

      <div className="comments-section">
        {comments.length === 0 ? (
          <p className="no-comments">You haven't added any comments yet.</p>
        ) : (
          comments.map((c) => (
            <div className="comment-card" key={c.comment_id}>
              <h3 className="movie-title">{c.movie_title}</h3>
              <p className="comment-text">{c.comment}</p>
              <span className="comment-date">{new Date(c.date).toLocaleDateString("hu-HU")}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
