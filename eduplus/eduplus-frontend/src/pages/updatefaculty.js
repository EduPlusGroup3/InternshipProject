import React from "react";

const UpdateFaculty = ({ onClose, username }) => {
  return (
    <div className="user-profile">
      <div className="profile-content">
        <h2>Update Faculty</h2>
        <p>Username: {username}</p>
        {/* Add other profile information */}
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

export default UpdateFaculty;
