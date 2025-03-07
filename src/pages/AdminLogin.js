import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css"; // Add custom styles here if needed

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin-dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg text-center" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-3 text-primary">Admin Portal</h2>
        <p className="text-muted">
          Please log in with your administrator credentials to manage events.
        </p>
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
