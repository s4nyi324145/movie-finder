import React, { useState } from "react";
import "../style/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", psw: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
   
    try {
        const response = await fetch("http://localhost:5500/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
    
       
        const data = await response.json();
    
        if (!response.ok) {
       
          return alert(data.message);
      
        }
    
    
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("user_id", data.user_id)
    
        navigate('/')
      
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Login failed. Please try again.");
      }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">MovieFinder Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="psw"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}
