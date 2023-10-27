import React, { useState } from "react";
import "../assests/styles/loginmodelstyles.css";
import ForgotPasswordModal from "./forgotpassword";
import { getDatabase, ref, get, child } from "firebase/database";
import close from "../assests/images/close.png";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const LoginModal = ({ isOpen, onClose, onLogin, openForgotModal }) => {
  const navigate = useNavigate();
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

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
  
      // Check if the user role matches the role in the database
      const userRole = await getUserRoleFromDatabase(user.uid); // Implement this function to get the role from your database
  //  console.log(userRole);
  //  console.log(selectedRole);
      if (userRole === selectedRole) {
        onLogin({ username: user.email, role: selectedRole,uid:user.uid }); // Adjust this based on your user data structure
        setError("");
        onClose(); // Close the modal
        setUsername("");
        setPassword("");
        setSelectedRole("user"); // Reset the role to the default after login
        navigate("/userhp");
      } else {
        setError("Invalid user role");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };
  
  const getUserRoleFromDatabase = async (uid) => {
    const database = getDatabase();
    const userRoleRef = ref(database, `users/${uid}/role`);
  
    try {
      const userRoleSnapshot = await get(userRoleRef);
      if (userRoleSnapshot.exists()) {
        return userRoleSnapshot.val();
      }
      return null; // User role not found
    } catch (error) {
      console.error("Error getting user role from database:", error);
      return null; // Handle the error as needed
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
              {/* <option value="instructor">Instructor</option> */}
              <option value="student">Student</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            LOGIN
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="extra-links">
          <a href="#" onClick={handleForgotPassword}>
            Forgot Password?
          </a>
          <span>|</span>
          <a href="/register">Create New Account</a>
        </div>
        <img src={close} alt="Close" className="close-image" onClick={onClose} />
      </div>
      <ForgotPasswordModal isOpen={isForgotModalOpen} onClose={closeForgotModal} />
    </div>
  );
};

export default LoginModal;
