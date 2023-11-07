
import React, { useState,useEffect } from "react";
import countriesList from '../dummydata/countries';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, getDatabase } from "firebase/database";
import { useAuth } from "./authcontext";


const ChildRegistrationPage = () => {
  
  const navigate = useNavigate();
  const { user, auth } = useAuth();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [grade, setGrade] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const { username: loggedInUserEmail } = useAuth();

  useEffect(() => {
    // Use the countriesList from the imported file
    setCountries(countriesList);
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (
      !firstname ||
      !password ||
      !confirmPassword ||
      !dob ||
      !grade ||
      !country ||
      !gender
    ) {
      setError("Kindly fill all the mandatory fields!");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        // Create a new user with email and password
        const { email } = user; // Get the parent's email
        const credential = await createUserWithEmailAndPassword(auth, email, password);

        if (credential) {
          const { uid } = credential.user;

          // Construct the path for saving child information
          const childInfoPath = `users/child/${uid}/information`;

          // Create a reference to the Firebase Realtime Database
          const database = getDatabase();

          // Define the data to be saved
          const childInfo = {
            firstname,
            dob,
            grade,
            country,
            gender,
          };

          // Save the child's information under the specified path
          await set(ref(database, childInfoPath), childInfo);

          // Registration successful, you can redirect the user
          navigate("/home");
        }
      } catch (error) {
        console.error("Error registering child:", error);
        setError("Registration failed. Please try again later.");
      }
    }
  };

  return (
    <div className="registration-page">
      {isRegistered ? (
        <div className="registration-success">
          <h2>Registration Successful!</h2>
          <p>
            Your registration is complete. Your First Name will be your UserName. You can now proceed to the Home page.
          </p>
          <button onClick={() => navigate("/home")}>Proceed to Home</button>
        </div>
      ) : (
        <div className="registraton-content">
          <h2>Child Registration</h2>
          <form onSubmit={handleRegistration}>
            <div className="form-group">
              <label htmlFor="firstname">First Name<span className="asteriskColor">*</span></label>
              <input
                type="text"
                id="firstname"
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
              <label htmlFor="password">Password<span className="asteriskColor">*</span></label>
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
              <label htmlFor="confirmPassword">Confirm Password<span className="asteriskColor">*</span></label>
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
              <label htmlFor="email">Email<span className="asteriskColor">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={loggedInUserEmail}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth<span className="asteriskColor">*</span></label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade in School<span className="asteriskColor">*</span></label>
              <input
                type="text"
                id="grade"
                name="grade"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country<span className="asteriskColor">*</span></label>
              <select
                id="country"
                name="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
              <option value="">Select Country</option>
              {countriesList.map((countryOption) => (
                <option key={countryOption} value={countryOption}>
                  {countryOption}
                </option>
              ))}
            </select>
            </div>
            <div className="form-group">
              <label htmlFor="region">State/Province</label>
              <input
                type="text"
                id="region"
                name="region"
                placeholder="State/Province"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender<span className="asteriskColor">*</span></label>
              <select
                id="gender"
                name="gender"
                value={gender}                
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit">REGISTER</button>             
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ChildRegistrationPage;