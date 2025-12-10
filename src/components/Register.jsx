import React, { useState } from "react";
import "../style/register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate()
    const [user,setUser] = useState(

        {username: "",
         psw: "",
         email: ""
        },
    )

    function handleChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    async function handleSubmit(e) {
        e.preventDefault(); 

        try {
            const response = await fetch("http://localhost:5500/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user)
            });
        
            if (!response.ok) {
              const errData = await response.json();
              throw new Error(errData.message);
            }
        
            const data = await response.json();
            console.log(data);
            navigate("/login");
          } catch (error) {
            alert(error.message);  
            console.error("Error:", error);
          }
     
    }
    
  

  return (
    <div className="register-page">
      <div className="register-box">
        <h2 className="register-title">Create Account</h2>

        <form className="register-form" onSubmit={handleSubmit}  >
          
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Your username"
              onChange={(e) => handleChange(e) }
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              onChange={(e) => handleChange(e) }
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="psw"
              placeholder="Your password"
              onChange={(e) => handleChange(e) }
              required
            />
          </div>

          <button className="register-btn" type="submit">
            Register
          </button>
        </form>

        <p className="login-text">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
