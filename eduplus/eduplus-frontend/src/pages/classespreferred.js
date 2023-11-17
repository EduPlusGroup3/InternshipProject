import React from "react";

const ClassesPreferred = ({ onClose, username , isParent}) => {
  return (
    <div className="user-profile">
      <div className="profile-content">       
        {isParent ? (
          // Render content for admin
          <h2>Available Courses</h2>
        ) : (
          // Render content for non-admin
          <h2>Classes Preferred</h2>
        )}
        <p>Username: {username}</p>
      </div>
    </div>
  );
};

export default ClassesPreferred;
