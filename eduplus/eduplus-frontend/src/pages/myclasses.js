// UserProfile.js

import React from "react";

const MyClasses = ({ onClose, username }) => {
  return (
    <div className="user-profile">
      <div className="profile-content">
        <h2>My Classes</h2>
        <p>Username: {username}</p>
        {/* Add other profile information */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MyClasses;
