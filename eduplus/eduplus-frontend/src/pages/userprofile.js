import React from "react";

const UserProfile = ({ onClose, username }) => {
  return (
    <div className="user-profile">
      <div className="profile-content">
        <h2>User Profile</h2>
        <p>Username: {username}</p>
        {/* Add other profile information */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserProfile;
