import React from "react";

const UpdateCourse = ({ onClose, username }) => {
  return (
    <div className="user-profile">
      <div className="profile-content">
        <h2>Update Courses</h2>
        <p>Username: {username}</p>
        {/* Add other profile information */}
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

export default UpdateCourse;
