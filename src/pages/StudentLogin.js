import React, { useState } from "react";
import { signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "../styles/StudentLogin.css";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) navigate("/student-dashboard");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/student-dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to Student Portal</h2>
        <p className="login-text">
          Sign in using your Google account to explore upcoming events, register for activities, and stay updated with all the latest happenings.
        </p>

        {/* Email & Password Login Form */}
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="or-text">OR</p>

        {/* Google Sign-In Button with Logo */}
        <button className="google-signin-btn" onClick={handleGoogleSignIn}>
          <FcGoogle />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default StudentLogin;