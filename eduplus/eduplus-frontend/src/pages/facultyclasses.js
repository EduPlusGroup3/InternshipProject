import React, { useEffect, useState } from "react";
import "../assests/styles/myclassesstyles.css";
import { fetchUserProfileData } from "./firebaseFunctions";
import { useAuth } from "./authcontext";
import { getDatabase, ref, push, set, get } from "firebase/database";

const FacultyClasses = () => {
  const [filteredAttendedClasses, setAttendedClasses] = useState([]);
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
    child: {},
    courses: {}
  });

  const facultyUid = currentUser.uid;
  const username = currentUser.username;
  const fetchFacultyData = async (facultyUid) => {
    const database = getDatabase();
    
      try {
            const existingFacultySnapshot = await get(ref(database, `users/faculty/${facultyUid}`));
            const facultyData = existingFacultySnapshot.val();
            const courseValues = Object.values(facultyData.courseUids)
            const classes = [];
            for(const courseUid of courseValues)
            {
              const courseSnapshot = await get(ref(database, `courses/${courseUid}`));
              const courseDetail = courseSnapshot.val();
              if(courseDetail != null)
              {
                const classDetail = {
                  category: courseDetail.selectedCategory,
                  course: courseDetail.selectedCourse,
                  schedule : courseDetail.courseDate + " " + courseDetail.selectedTimings,
                  courseType: courseDetail.courseType
                };
                classes.push(classDetail);
              }
            }
            setAttendedClasses(classes);
      } catch (error) {
        console.error("Error fetching data for child with UID", error);
      }
    }
  
  fetchFacultyData(facultyUid);

  return (
    <div className="user-profile">
      <div className="profile-content">
        {(
          <p className="username">Username: {username}</p>
        )}

        <div style={{ marginTop: "10px" }} className={`class-box attended-box ${filteredAttendedClasses.length > 0 ? 'has-data' : 'no-data'}`}>
          <h3>Enrolled Classes:</h3>
          {filteredAttendedClasses.length > 0 ? (
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th>Course Category</th>
                  <th>Course Name</th>
                  <th>Course Type</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendedClasses.map((attendedClass) => (
                  <tr key={attendedClass.id}>
                    <td>{attendedClass.category}</td>
                    <td>{attendedClass.course}</td>
                    <td>{attendedClass.courseType}</td>
                    <td>{attendedClass.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No enrolled classes available.</p>
          )}
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

      {/*<div className="class-box upcoming-box">
        <h3 className="upcoming-text">&#9733; Upcoming Classes &#9733;</h3>
        <ul className="upcoming-list">
          {Array.isArray(filteredUpcomingClasses) &&
            filteredUpcomingClasses.map((upcomingClass) => (
              <li key={upcomingClass.id} className="upcoming-item">
                {upcomingClass.className} - {upcomingClass.date} {upcomingClass.time} ({upcomingClass.day})
              </li>
            ))}
        </ul>
        </div> */}
    </div>
  );
};

export default FacultyClasses;
