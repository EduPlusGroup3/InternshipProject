import React, { useState } from "react";
import "../assests/styles/loginmodelstyles.css"; 
import dummyUsers from "../dummydata/logindummydata";
import ForgotPasswordModal from "./forgotpassword";
import close from "../assests/images/close.png";


const LoginModal = ({ isOpen, onClose, onLogin , openForgotModal }) => {
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("user"); 
  const [error, setError] = useState("");

  if (!isOpen) return null; 

  const closeForgotModal = () => {
    setIsForgotModalOpen(false);
  };

  const handleForgotPassword = () => {
    openForgotModal(); 
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate user authentication
    const user = dummyUsers.find((user) => user.username === username);

    if (user && user.password === password) {
      onLogin({ ...user, role: selectedRole });
      setError("");
      onClose(); // Close the modal
      setUsername("");
      setPassword("");
      setSelectedRole("user"); // Reset the role to the default after login
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
            <label className="label">Password</label>
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
            <label className="label">User Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="form-control"
            >
              <option value="admin">Admin</option>
              <option value="parent">Parent</option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            LOGIN
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="extra-links">
          <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
          <span>|</span>
          <a href="/register">Create New Account</a>
        </div>
        <img
          src={close}  
          alt="Close"
          className="close-image"
          onClick={onClose}          
        />
      </div>
      <ForgotPasswordModal isOpen={isForgotModalOpen} onClose={closeForgotModal} />

    </div>
  );
};

export default LoginModal;
