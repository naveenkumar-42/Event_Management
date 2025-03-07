import React from "react";
import { signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css"; // Add custom styles here if needed

const StudentLogin = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) navigate("/student-dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg text-center" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-3 text-primary">Welcome to Student Portal</h2>
        <p className="text-muted">
          Sign in using your Google account to explore upcoming events, register for activities, and stay updated with all the latest happenings.
        </p>
        <button className="btn btn-danger w-100" onClick={handleGoogleSignIn}>
          <i className="fab fa-google me-2"></i> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default StudentLogin;
