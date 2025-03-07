import React from "react";
import { signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentLogin = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) navigate("/student-dashboard");
  };

  return (
    <div className="container mt-5">
      <h2>Student Login</h2>
      <button className="btn btn-danger" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default StudentLogin;
