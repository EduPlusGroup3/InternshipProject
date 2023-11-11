import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import countriesList from '../dummydata/countries';

const AddFaculty = ({facultyToUpdate }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [pincode, setPincode] = useState("")
  const [dob, setDOB] = useState("");
  const [mobile, setMobile]= useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress]=useState("");
  const [degree, setDegree]= useState("");  
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const [isAddFaculty, setIsAddFaculty] = useState(false);

  useEffect(() => {
    // Use the countriesList from the imported file
    setCountries(countriesList);
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !userId ||
      !firstname ||
      !lastname ||
      !gender ||
      (!facultyToUpdate && (!password || !confirmPassword)) ||
      !country ||
      !region ||
      !gender ||
      !address ||
      !degree ||
      !pincode
    ) {
      setError("All fields are required");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (userId.length > 8){
      setError("Username must be at most 8 characters long.");
    }else if (!/^\d+$/.test(mobile) || mobile.length < 10 || mobile.length > 12) {
      setError("Invalid mobile number. Please enter a valid mobile number.");      
    }  
    else {      
      setError("");
      //If add faculty is true then add new user else update user
      if (isAddFaculty) {
        // Logic to add faculty
        console.log("Adding faculty:", {
          userId,
          firstname,
          lastname,
          gender,
          country,
          region,
          pincode,
          dob,
          mobile,
          password,
          address,
          degree,
          profilePic,
        });
        //Backend logic
      } else {
        // Logic to update faculty
        console.log("Updating faculty:", {
          userId,
          firstname,
          lastname,
          gender,
          country,
          region,
          pincode,
          dob,
          mobile,
          address,
          degree,
          profilePic,
        });
        //Backend uddate faculty logic
      }
      setIsAddFaculty(true); // Reset to add faculty mode      
    }
  }; 

  return (
    <div className="user-profile">
      {isAddFaculty ? (
        <div className="registration-success">
          <h2>Faculty Added!</h2>
          <p>Faculty successfully added/updated. Please use your username to login</p>
          <button onClick={() => navigate("/home")}>Proceed to Home</button>
        </div>
      ) : (
        <div >
          <h2>Add/Update Faculty</h2>
          <form onSubmit={handleRegistration}>
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
              <label htmlFor="userId">UserName:<span className="asteriskColor">*</span></label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="User Name"
                value={userId}
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
              <label htmlFor="region">State/Province:</label>
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
              <label htmlFor="pincode">Pincode:<span className="asteriskColor">*</span></label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
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
              <label htmlFor="address">Address:<span className="asteriskColor">*</span></label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
              <div className="form-group">
                <label htmlFor="profilePic">Profile pic (optional):</label>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.value)}
                />
                {profilePic && (
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt="Profile Preview"
                    className="profile-preview"
                  />
                )}
              </div>
            
            <button type="submit">Add/Update Faculty</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};         


export default AddFaculty;
