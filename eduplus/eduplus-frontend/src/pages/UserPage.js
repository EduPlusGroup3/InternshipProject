import React, { useEffect, useState } from "react";
import UserProfile from "./userprofile";
import { useAuth } from "../authcontext"; // Import the useAuth hook
import { fetchUserProfileData } from "./firebaseFunctions"; // Import the function to fetch user data

const UserHomePage = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

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

  return (
    <div>
      <h1>User Home Page</h1>
      {userData && <UserProfile userData={userData} />}
    </div>
  );
};

export default UserHomePage;
