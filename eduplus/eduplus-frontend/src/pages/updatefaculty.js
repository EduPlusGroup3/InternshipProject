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

  const registerFaculty = async (email) => {
    const auth = getAuth();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      if (user) {
        const database = getDatabase();
        const usersRef = ref(database, "users/faculty/" + user.uid);
        const newFaculty = {
          role: "instructor",
          uid: user.uid,
          firstname,
          lastname,
          gender,
          country,
          dob,
          mobile,
          password,
          degree,
        };
        await set(usersRef, newFaculty);

        setIsUpdateFaculty(true);
      }
    } catch (error) {
      console.error("Error registering faculty:", error.code, error.message);
      setError("Registration failed. Please try again later.");
    }
  };

  const handleSearchEmail = async () => {
    if (userId) {
      const trimmedFirstname = userId.trim().toLowerCase();
      const constructedEmail = `${trimmedFirstname}@eduplus.com`;

      const database = getDatabase();
      const userRef = ref(database, `users/faculty/${constructedEmail}`);

      try {
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          setUserData(userData);
          setFirstname(userData.firstname);
          setLastname(userData.lastname);
          setGender(userData.gender);
          setCountry(userData.country);
          setDOB(userData.dob);
          setMobile(userData.mobile);
          setDegree(userData.degree);
        } else {
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
          <p>Faculty successfully updated. Please use your email to login</p>
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
