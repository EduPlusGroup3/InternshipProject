import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import countriesList from "../dummydata/countries";
import { useAuth } from "./authcontext";
import { fetchUserProfileData } from "./firebaseFunctions";
import searchIcon from "../assests/images/search.png"; 

const UpdateFaculty = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email,setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDOB] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [degree, setDegree] = useState("");
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const [userId, setUserId] = useState("");
  const [isUpdateFaculty, setIsUpdateFaculty] = useState(false);
  const { username: loggedInUserEmail } = useAuth();

  useEffect(() => {
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
    const auth = getAuth();
    const database = getDatabase();

    if (

      !firstname ||
      !lastname ||
      !gender ||
      !country ||
      !dob ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !degree
    ) {
      setError("All fields are required");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      const trimmedFirstname = firstname.trim().toLowerCase();
      const constructedEmail = `${trimmedFirstname}@eduplus.com`;
      registerFaculty(constructedEmail);
    }
  };

  const registerFaculty = async () => {
    const auth = getAuth();
    try {
      const user = currentUser; // Assuming currentUser is available in your component state
      if (!user) {
        throw new Error("User not authenticated");
      }
  
      const database = getDatabase();
      const usersRef = ref(database, `users/faculty/${userData.uid}`);
 // Fetch the current user data from the database
 const snapshot = await get(usersRef);
 const currentData = snapshot.val();

      console.log("ref", usersRef);
    // Log the UID you are updating
    console.log("Updating user with UID:", userData.uid);
     // Update only the fields that have changed
     const updatedData = {
      ...currentData,
      firstname: firstname || currentData.firstname,
      lastname: lastname || currentData.lastname,
      gender: gender || currentData.gender,
      country: country || currentData.country,
      dob: dob || currentData.dob,
      mobile: mobile || currentData.mobile,
      degree: degree || currentData.degree,
    };

  // Update the specific user's data
  await set(usersRef, updatedData);
      setIsUpdateFaculty(true);
    } catch (error) {
      console.error("Error updating faculty:", error);
      setError("Update failed. Please try again later.");
    }
  };
  const handleSearchEmail = async () => {
    if (userId) {
      const trimmedFirstname = userId.trim().toLowerCase();
      const database = getDatabase();
      const usersRef = ref(database, "users/faculty");

      try {
        const userSnapshot = await get(usersRef);
        let foundUser = null; // Variable to store the found user
        userSnapshot.forEach((userSnapshot) => {
          const userData = userSnapshot.val();
          if (userData.email === `${trimmedFirstname}@eduplus.com`) {
            setEmail(userData.email);
            setUserData(userData);
            setFirstname(userData.firstname);
            setLastname(userData.lastname);
            setGender(userData.gender);
            setCountry(userData.country);
            setDOB(userData.dob);
            setMobile(userData.mobile);
            setDegree(userData.degree);
            

             // Save the UID of the found user
          foundUser = userSnapshot.key;
          }
        });
        // If user is not found after iterating through all nodes
      if (!foundUser) {
        setError("User not found");
      } 
        
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again later.");
      }
    } else {
      setError("Please enter an email to search");
    }
  };

  return (
    <div className="user-profile">
      {isUpdateFaculty ? (
        <div className="registration-success">
          <h2>Faculty Updated!</h2>
          <p>Faculty successfully updated.</p>
          <button onClick={() => navigate("/home")}>Proceed to Home</button>
        </div>
      ) : (
        <div>
          <h2>Update Faculty</h2>
          <form onSubmit={handleRegistration}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <div className="search-input">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <div className="search-icon-container">
                <img
                  src={searchIcon}
                  alt="Search Icon"
                  className="search-icon"
                  onClick={handleSearchEmail}
                />
              </div>
            </div>
          </div>
            <div className="form-group">
              <label htmlFor="firstname">First Name:<span className="asteriskColor">*</span></label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name:<span className="asteriskColor">*</span></label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>                       
            <div className="form-group">
              <label htmlFor="gender">Gender<span className="asteriskColor">*</span></label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>              
            </div>
            <div className="form-group">
              <label htmlFor="country">Country<span className="asteriskColor">*</span></label>
              <select
                id="country"
                name="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
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
              <label htmlFor="dob">Date of Birth:<span className="asteriskColor">*</span></label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                required
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
                required
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div> 
            <div className="form-group">
                <label htmlFor="degree">Highest Level of Degree:<span className="asteriskColor">*</span></label>
                <select
                  id="degree"
                  name="degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="High School">High School</option>
                  <option value="Associate's Degree">Associate's Degree</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="Doctoral Degree">Doctoral Degree</option>
                </select>
              </div>               
            
            <button type="submit">Update Faculty</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};         


export default UpdateFaculty;
