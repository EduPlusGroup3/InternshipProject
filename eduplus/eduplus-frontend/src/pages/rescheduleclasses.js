

import React from "react";

const RescheduleClasses = ({ onClose, username }) => {
  return (
    <div className="user-profile">
      <div className="profile-content">
        <h2>Reschedule Classes</h2>
        <p>Username: {username}</p>
        {/* Add other profile information */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RescheduleClasses;
