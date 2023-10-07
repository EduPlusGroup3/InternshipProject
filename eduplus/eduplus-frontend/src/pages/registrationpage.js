import "..//assests/styles/registrationpagestyles.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { database, auth } from "../firebase";
import { query, where, getDocs } from "firebase/firestore";
//below
//
const RegistrationPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [grade, setGrade] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (
      !firstname ||
      !lastname ||
      !password ||
      !confirmPassword ||
      !email ||
      !dob ||
      !grade ||
      !country ||
      !region ||
      !gender
    ) {
      setError("All fields are required");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (!isAgeValid(dob)) {
      setError("You must be at least 6 years old to register.");
    } else if (await isEmailAlreadyRegistered(email)) {
      setError("Email address is already registered.");
    } else {
      registerUser(); // Register the user in Firestore
    }
  };

  const isAgeValid = (dateOfBirth) => {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 6;
    }

    return age >= 6;
  };

  const isEmailAlreadyRegistered = async (emailToCheck) => {
    const userRef = collection(database, "users");
    const q = query(userRef, where("email", "==", emailToCheck));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  };

  const registerUser = async () => {
    try {
      const authInstance = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password
      );

      if (user) {
        // Create a new document with the user's UID as the document ID
        const userDocRef = doc(database, "users", user.uid);

        // Set user data within that document
        await setDoc(userDocRef, {
          firstname,
          lastname,
          email,
          dob,
          grade,
          country,
          region,
          gender,
          password,
          uid:user.uid
        });

        setIsRegistered(true);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Registration failed. Please try again later.");
    }
  };

  useEffect(() => {
    // Check if the user is already authenticated, and if so, redirect them to the home page
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="registration-page">
      {isRegistered ? (
        <div className="registration-success">
          <h2>Registration Successful!</h2>
          <p>Your registration is complete. You can now proceed to the Home page.</p>
          <button onClick={() => navigate("/home")}>Proceed to Home</button>
        </div>
      ) : (
        <div className="registraton-content">
          <h2>Registration</h2>
          <form onSubmit={handleRegistration}>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
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
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade in School</label>
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
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="region">Region</label>
              <input
                type="text"
                id="region"
                name="region"
                placeholder="Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
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

