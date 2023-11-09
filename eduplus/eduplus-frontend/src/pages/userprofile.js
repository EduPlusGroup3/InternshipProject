import React, { useEffect, useState } from "react";
import { fetchUserProfileData } from "./firebaseFunctions"; // Import the function to fetch user data
import { useAuth } from "../pages/authcontext"; // Import the useAuth hook

const UserProfile = () => {
  const { currentUser } = useAuth(); // Get the currently authenticated user
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    region: "",
    gender: "",
  });

  useEffect(() => {
    // Fetch user data if a user is authenticated
    if (currentUser) {
      const uid = currentUser.uid; // Use the user's uid as the path
      const fetchData = async () => {
        const data = await fetchUserProfileData(uid);
        if (data) {
          setUserData(data);
        }
      };

      fetchData();
    }
  }, [currentUser]);

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <form>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            value={userData.firstname}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            value={userData.lastname}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Country"
            value={userData.country}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region</label>
          <input
            type="text"
            id="region"
            name="region"
            placeholder="Region"
            value={userData.region}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            placeholder="Gender"
            value={userData.gender}
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
