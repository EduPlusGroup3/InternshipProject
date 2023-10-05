import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assests/styles/registrationpagestyles.css"

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setage] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistration = (e) => {
    e.preventDefault();

    if (!firstname ||!lastname || !password || !confirmPassword || !email) {
      setError("All fields are required");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setIsRegistered(true);      
    }
  };

  return (
    <div className="registration-page">

      {isRegistered ? (
        <div className="registration-success">
          <h2>Registration Successful!</h2>
          <p>Your registration is complete. You can now proceed to the Home page.</p>
          <button onClick={() => navigate('/home')}>Proceed to Home</button>
        </div>
      ) : (

      <div className="registraton-content">
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="fisrtname"
            name="firstname"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>  
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>      
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>  
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">REGISTER</button> 
      </form>
      {error && <p className="error">{error}</p>}
      </div>
      )}
      </div>
  );
};

export default RegistrationPage;
