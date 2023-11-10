import React from "react";
import "../assests/styles/myclassesstyles.css";

const MyClasses = ({ onClose, username, classesData }) => {
  return (
    <div className="user-profile">
      <div className="profile-content">
        <h2>My Classes</h2>
        <p className="username">Username: {username}</p>

        <div className="class-box attended-box">
          <h3>Classes Attended:</h3>
          <ul>
            {classesData.attended.map((attendedClass) => (
              <li key={attendedClass.id}>
                {attendedClass.className} - {attendedClass.date} {attendedClass.time} ({attendedClass.day})
              </li>
            ))}
          </ul>
        </div>

        <div className="class-box missed-box">
          <h3>Classes Missed:</h3>
          <ul>
            {classesData.missed.map((missedClass) => (
              <li key={missedClass.id}>
                {missedClass.className} - {missedClass.date} {missedClass.time} ({missedClass.day})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="class-box upcoming-box">
        <h3 className="upcoming-text">Upcoming Classes &#9733;</h3>
        <ul className="upcoming-list">
          {classesData.upcoming.map((upcomingClass) => (
            <li key={upcomingClass.id} className="upcoming-item">
              {upcomingClass.className} - {upcomingClass.date} {upcomingClass.time} ({upcomingClass.day})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyClasses;
