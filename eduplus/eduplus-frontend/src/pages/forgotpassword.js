import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';
import close from "./close.png";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDhaLZlq1uIMYBb2I2SQrsbAFzaRDGNLU4",
  authDomain: "eduplus-db8d3.firebaseapp.com",
  projectId: "eduplus-db8d3",
  storageBucket: "eduplus-db8d3.appspot.com",
  messagingSenderId: "751709209882",
  appId: "1:751709209882:web:1a9a6a04aa28ff79ca98a3",
  measurementId: "G-Q2VPP146KV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // You can add any additional initialization logic here
  }, []);

  if (!isOpen) return null;

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (!email.trim()) {
        setError("Please enter your email.");
        return;
      }

      // Check if the email is associated with an existing account
      const userExists = await checkUserExists(email);

      if (!userExists) {
        setError("No account found with this email address.");
        console.log(email + " NO ACCOUNT");
        return;
      }

      // Send password reset email
      await sendPasswordResetEmail(auth, email);

      // Password reset email sent successfully
      setError("");
      setSuccessMessage("Password reset email sent. Please check your email.");
    } catch (error) {
      // Handle errors from Firebase
      console.error("Firebase Error:", error);
      setError(error.message);
    }
  };

  const checkUserExists = async (email) => {
    const relevantNodes = ['users', 'child','users/faculty'];
  
    // Iterate through each relevant node in the database
    for (const node of relevantNodes) {
      const nodeRef = ref(database, node);
      const snapshot = await get(nodeRef);
  
      // Check if any user in the node has the specified email
      if (snapshot.exists()) {
        const nodeData = snapshot.val();
        const emailExists = checkEmailInNode(nodeData, email);
        if (emailExists) {
          return true;
        }
      }
    }
  
    return false;
  };
  const checkEmailInNode = (nodeData, email) => {
    // Check if any user in the node has the specified email
    if (nodeData) {
      const users = Object.values(nodeData);
      return users.some((user) => user.email === email);
    }
  
    return false;
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
            <label className="label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email Address"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            RESET PASSWORD
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
