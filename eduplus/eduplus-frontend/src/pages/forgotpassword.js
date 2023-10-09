import React, { useState } from "react";
import "../assests/styles/forgotpasswordstyles.css"; 
import dummyUsers from "../dummydata/logindummydata";
import close from "../assests/images/close.png";

const ForgotPasswordModal = ({ isOpen, onClose, onLogin, users }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleForgotPassword = (e) => {
    e.preventDefault();

    // Validation
    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password.trim() || !confirmpassword.trim()) {
      setError("Please enter both the new password and confirm password.");
      return;
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate password reset logic
    const user = dummyUsers.find((user) => user.username === username);

    if (user) {
      // Password reset successful
      setError("");
      onClose(); // Close the modal
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setError("Invalid username.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={close}  
          alt="Close"
          className="close-image"
          onClick={onClose}          
        />
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label className="label">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="User Name"
            />
          </div>
          <div className="form-group">
            <label className="label">New Password</label>
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
          <div className="form-group">
            <label className="label">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              placeholder="Confirm Password"
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">
            RESET PASSWORD
          </button>
        </form>
        {error && <p className="error">{error}</p>}        
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
