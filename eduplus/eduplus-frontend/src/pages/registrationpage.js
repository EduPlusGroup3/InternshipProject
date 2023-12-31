import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assests/styles/registrationpagestyles.css";
import countriesList from '../dummydata/countries';
import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Use the countriesList from the imported file
    setCountries(countriesList);
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (
      !firstname ||
      !lastname ||
      !password ||
      !confirmPassword ||
      !email ||
      !country ||
      !region ||
      !gender
    ) {
      setError("All fields are required");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (await isEmailAlreadyRegistered(email)) {
      setError("Email address is already registered.");
    } else {
      // setIsRegistered(true);
      registerUser(); // Register the user in Firebase Realtime Database
    }
  };

  const isEmailAlreadyRegistered = async (emailToCheck) => {
    const database = getDatabase();
    const usersRef = ref(database, "users");
    
    // Query the database to check if the email exists
    const snapshot = await get(usersRef);
    
    if (snapshot.exists()) {
      const userData = snapshot.val();
      for (const userId in userData) {
        if (userData[userId].email === emailToCheck) {
          return true; // Email already registered
        }
      }
    }
    
    return false; // Email not registered
  };

  const registerUser = async () => {
    const auth = getAuth();

    try {
      // Create a new user in Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      if (user) {
        // User successfully created in Firebase Authentication, now save additional data in Realtime Database
        const database = getDatabase();
        const usersRef = ref(database, "users/" + user.uid);
        const newUser = {
          role:"parent",
          uid:user.uid,
          firstname,
          lastname,
          email,
          country,
          region,
          gender,
        };
        await set(usersRef, newUser);

        setIsRegistered(true);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="registration-page">
      {isRegistered ? (
        <div className="registration-success">
          <h2>Registration Successful!</h2>
          <p>Your registration is complete. Your emailId will be your username. You can now proceed to the Home page.</p>
          <button onClick={() => navigate("/home")}>Proceed to Home</button>
        </div>
      ) : (
        <div className="registraton-content">
          <h2>Registration</h2>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default RegistrationPage;
