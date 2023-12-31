import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assests/styles/registrationpagestyles.css";
import countriesList from '../dummydata/countries';
import { database } from '../firebase'
import { getDatabase, ref, set, get } from "firebase/database";
import { useAuth } from "../pages/authcontext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fetchUserProfileData } from "./firebaseFunctions"; // import the function to fetch user data

const ChildRegistrationPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userID, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [grade, setGrade] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  //const { username: loggedInUserEmail } = useAuth();

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
    const trimmedUsername = userID.trim();
    setUserName(trimmedUsername);
    setUserId(trimmedUsername)

    if (
      !firstname ||
      // !lastname ||
      //!trimmedUsername ||
      !password ||
      !confirmPassword ||
      !userID ||
      !dob ||
      !grade ||
      !country ||
      // !region ||
      !gender
    ) {
      setError("Kinldy fill all the mandatory fields!");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (userID.length > 8) {
      setError("Username must be at most 8 characters long");
    } else if (!isAgeValid(dob)) {
      setError("You must be at least 6 years old to register.");
    } else {
      const constructedEmail = `${userID}@eduplus.com`;  // Construct the email address using firstname
      if (await isUserAlreadyRegistered(constructedEmail)) {
        setError("This UserId is already taken, please choose another.");
      } else {
        registerUser(currentUser.uid, constructedEmail); // set the email field with the constructed email
      }
    }
  };

  const isAgeValid = (dateOfBirth) => {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      return age - 1 >= 6;
    }

    return age >= 6;
  };

  const isUserAlreadyRegistered = async (emailToCheck) => {
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


  const registerUser = async (currentUserUid, email) => {
    const auth = getAuth();
    try {
      // Create a new user in Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        const database = getDatabase();
        // Fetch the current count of children registered under the parent's node
        const parentRef = ref(database, `users/${currentUserUid}/child`);
        const parentSnapshot = await get(parentRef);
        const childCount = parentSnapshot.exists() ? Object.keys(parentSnapshot.val()).length : 0;

        // Set the child's name (using the first name) as the key under the parent's node
        const childName = firstname;

        ;
        const usersRef = ref(database, "child/" + user.uid);
        const newUser = {
          role: "student",
          uid: user.uid,
          firstname,
          lastname,
          email,
          //userName : userName,
          userID,
          dob,
          grade,
          country,
          region,
          gender,
          parentUid: currentUserUid, // Store the parent's UID
        };
        await set(usersRef, newUser);
        // Update the parent's data with the child's UID under the child's name (first name)
        const parentChildRef = ref(database, `users/${currentUserUid}/child/${childName}`);
        await set(parentChildRef, user.uid);

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
          <p>
            Your registration is complete. Please login with your UserName. You can now proceed to the Home page.
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