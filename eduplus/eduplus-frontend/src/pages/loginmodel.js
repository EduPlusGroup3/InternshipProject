   
import React,{useState} from "react";
import "../assests/styles/loginmodelstyles.css"
import dummyUsers from "../dummydata/logindummydata";

const LoginModal = ({ isOpen, onClose, onLogin, users }) => {    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    if (!isOpen) return null;
    const handleLogin = (e) => {
        e.preventDefault();
    
        // Simulate user authentication
        const user = dummyUsers.find((user) => user.username === username);
    
        if (user && user.password === password) {
          onLogin(user);
          setError("");          
          onClose(); // Close the modal
          setUsername("");
          setPassword("");
        } else {
          setError("Invalid username or password");
        }
      };

    return (
        <div className="modal-overlay">
        <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleLogin}> 
            <div class="form-group">
                <label>User Name</label>
                <input type="text" id="username" name="username" value={username} onChange={(e)=> setUsername(e.target.value)} className="form-control" placeholder="First name" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="text" id="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control" placeholder="Password" />
            </div>  
        <button type="submit" className="btn btn-primary btn-block">LOGIN</button>
            
        </form>
        {error && <p className="error">{error}</p>}
                <div className="extra-links">
                <a href="#">Forgot Password?</a>
                <span>|</span>
                <a href="#">Create New Account</a>
                </div>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
            </div>
        );
        };

        export default LoginModal;


