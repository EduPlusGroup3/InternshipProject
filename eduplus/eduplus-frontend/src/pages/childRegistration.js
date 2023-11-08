import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assests/styles/registrationpagestyles.css";
import countriesList from '../dummydata/countries';
import {database} from '../firebase'
import { getDatabase, ref, set, get } from "firebase/database";
import { useAuth } from "../pages/authcontext";
//import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fetchUserProfileData } from "./firebaseFunctions"; // Import the function to fetch user data

const ChildRegistrationPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userID, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailMissing, setIsEmailMissing] = useState(false); // New state
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
    // Whenever the email state changes, check if it's missing
    if (!email) {
      setIsEmailMissing(true);
    } else {
      setIsEmailMissing(false);
    }
  }, [email]);
  useEffect(() => {
    
    // Use the countriesList from the imported file
    setCountries(countriesList);
  }, []);

  useEffect(() => {
    if (currentUser) {
      const uid = currentUser.uid;
      fetchUserProfileData(uid)
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user profile data:", error);
        });
    }
  }, [currentUser]);

  const handleRegistration = async (e) => {
    e.preventDefault();
  // Trim leading and trailing spaces from the username
  const trimmedUserID = userID.trim();
  // Check if the username contains spaces
  if (trimmedUserID.includes(' ')) {
    setError("Username cannot contain spaces. Please choose a different username.");
    return;
  }
    if (
      !firstname ||
      // !lastname ||
      !password ||
      !confirmPassword ||
<<<<<<< HEAD
=======
      !trimmedUserID || // Use the trimmed username for validation
      !userID ||
>>>>>>> db06c098879a1cff8d72f3df4f7996397437701a
      !dob ||
      !grade ||
      !country ||
      // !region ||
      !gender
    ) {
      setError("Kinldy fill all the mandatory fields!");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
<<<<<<< HEAD
    } else {
      try {
        // Create a new user with email and password
        const { email } = user; // Get the parent's email
        const credential = await createUserWithEmailAndPassword(auth, email, password);
=======
    } else if (trimmedUserID.length > 8) {
      setError("Username must be at most 8 characters long");
    } else if (!isAgeValid(dob)) {
      setError("You must be at least 6 years old to register.");
    } else {
      // Construct the email address using firstname
      const constructedEmail = `${trimmedUserID}@eduplus.com`;
      setEmail(constructedEmail);
      if (await isUserAlreadyRegistered(constructedEmail)) {
        setError("This UserId is already taken, please choose another.");
      } else {
        // Set the email field with the constructed email
        
      console.log("Email Value Before Registration:", email); // Debugging line
        // Set the email field with the constructed email
       
        // Continue with registration
      registerUser(currentUser.uid);
        }
    }
  };
>>>>>>> db06c098879a1cff8d72f3df4f7996397437701a

        if (credential) {
          const { uid } = credential.user;

          // Construct the path for saving child information
          const childInfoPath = `users/child/${uid}/information`;

          // Create a reference to the Firebase Realtime Database
          const database = getDatabase();

<<<<<<< HEAD
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
=======
  /*
  const isEmailAlreadyRegistered = async (emailToCheck) => {
    const userRef = collection(database, "users");
    const q = query(userRef, where("email", "==", userIDToCheck));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  };
 */
  const isUserAlreadyRegistered = async (emailToCheck) => {
    const database = getDatabase();
    const usersRef = ref(database, "child");

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


  const registerUser = async (currentUserUid) => {
    const auth = getAuth();
    try {
       // Ensure the email is set properly
    if (!email) {
      setError("Email is missing. Please try again.");
      return;
    }
      // Create a new user in Firebase Authentication
      console.log("email value is :", email);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      //const userRef = collection(database, "users");
      if(user)
      {
        const database = getDatabase();
        const usersRef = ref(database, "child/" + user.uid);
        const newUser = {
          role: "student",
          uid: user.uid,
          firstname,
          lastname,
          email,
          dob,
          grade,
          country,
          region,
          gender,
          password,
          parentUid: currentUserUid, // Store the parent's UID
        };
        await set(usersRef, newUser);
        setIsRegistered(true);
>>>>>>> db06c098879a1cff8d72f3df4f7996397437701a
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
              <label htmlFor="userID">Username<span className="asteriskColor">*</span></label>
              <input
                type="username"
                id="username"
                name="username"
                placeholder="Username"
                value={userID}
                maxLength="8"  
                onChange={(e) => setUserId(e.target.value)}             
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