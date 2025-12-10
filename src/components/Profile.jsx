import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id")

   async function getUserComments(params) {
            const result = await fetch(`http://localhost:5500/comments/users/${user_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await result.json();
            setComments(data)
   }

  useEffect(() => {
    if (!token) return navigate("/login");
    getUserComments()
  }, []);

  useEffect(() => console.log(comments), [comments])

  return (
    <>
        <div className="profile-page">
      <h1>My Profile</h1>

   
        <h2>My Comments</h2>
        
   

     
    </div>

    </>
  );
}
