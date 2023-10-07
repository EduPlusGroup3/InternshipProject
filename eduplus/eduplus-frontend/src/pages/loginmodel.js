import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../assests/styles/loginmodelstyles.css";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        onLogin(user);
        setError("");
        onClose(); // Close the modal
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            LOGIN
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="extra-links">
          <a href="#">Forgot Password?</a>
          <span>|</span>
          <a href="/register">Create New Account</a>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
