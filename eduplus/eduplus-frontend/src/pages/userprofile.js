import React, { useEffect, useState } from "react";
import { fetchUserProfileData } from "./firebaseFunctions";
import { useAuth } from "../pages/authcontext";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    region: "",
    gender: "",
    grade: "", // New field for grade
    course: "", // New field for course
  });

  useEffect(() => {
    if (currentUser) {
      const uid = currentUser.uid;
      const role = currentUser.role;
      console.log("currentUser->",currentUser);
      const fetchData = async () => {
        const data = await fetchUserProfileData(uid, role);
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
        {userData.grade && ( 
          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              id="grade"
              name="grade"
              placeholder="Grade"
              value={userData.grade}
              readOnly
            />
          </div>
        )}
        {userData.course && (
          <div className="form-group">
            <label htmlFor="course">Course</label>
            <select
              id="course"
              name="course"
              value={userData.course}
              readOnly
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
