import React from "react";
import "../assests/styles/myclassesstyles.css";

const MyClasses = ({ onClose, username, classesData, isParent, childNames = [], selectedChild, onChildChange }) => {
  // Provide two dummy child names
  const dummyChildNames = ["Child1", "Child2"];

  // Filter attended classes for the selected child
  const filteredAttendedClasses = isParent
    ? classesData.attended.filter((attendedClass) => attendedClass.childName === selectedChild)
    : classesData.attended;

  // Filter upcoming classes for the selected child
  const filteredUpcomingClasses = isParent
    ? classesData.upcoming.filter((upcomingClass) => upcomingClass.childName === selectedChild)
    : classesData.upcoming;

  return (
    <div className="user-profile">
      <div className="profile-content">
        {isParent ? (
          <div>
            <h2>Student Classes</h2>
            <label htmlFor="childDropdown">Select Child:</label>
            <select id="childDropdown" value={selectedChild} onChange={onChildChange}>
              {/* Use dummyChildNames instead of childNames */}
              {dummyChildNames.map((childName) => (
                <option key={childName} value={childName}>
                  {childName}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="username">Username: {username}</p>
        )}

        <div style={{ marginTop: "10px" }} className="class-box attended-box">
          <h3>Enrolled Classes:</h3>
          <ul>
            {filteredAttendedClasses.map((attendedClass) => (
              <li key={attendedClass.id}>
                {attendedClass.className} - {attendedClass.date} {attendedClass.time} ({attendedClass.day})
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="class-box missed-box">
          <h3>Classes Missed:</h3>
          <ul>
            {filteredMissedClasses.map((missedClass) => (
              <li key={missedClass.id}>
                {missedClass.className} - {missedClass.date} {missedClass.time} ({missedClass.day})
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      <div className="class-box upcoming-box">
        <h3 className="upcoming-text">&#9733; Upcoming Classes &#9733;</h3>
        <ul className="upcoming-list">
          {Array.isArray(filteredUpcomingClasses) &&
            filteredUpcomingClasses.map((upcomingClass) => (
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
