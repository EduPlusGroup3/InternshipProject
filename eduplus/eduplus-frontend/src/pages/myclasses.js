import React, { useEffect, useState } from "react";
import "../assests/styles/myclassesstyles.css";
import { fetchUserProfileData } from "./firebaseFunctions";
import { useAuth } from "../pages/authcontext";
import { getDatabase, ref, push, set, get } from "firebase/database";

const MyClasses = (
  { username, isParent }) => {
  const [selectedChild, setSelectedChild] = useState("");
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

  const handleChildChange = (event) => {
    setSelectedChild(event.target.value);
  };


  useEffect(() => {
    if (currentUser) {
      const uid = currentUser.uid;
      const fetchData = async () => {
        const data = await fetchUserProfileData(uid);
        if (data) {
          setUserData(data);
          const {currentUser} = useAuth;
          const userRole = currentUser? currentUser.userRole: null;
          console.log(userRole)
        }
      };
      fetchData();
    }
  }, [currentUser]);


  // Extract child names from userData
  const childNamesFromData = Object.keys(userData.child)

  const fetchData = async (childUid) => {
    const database = getDatabase(); 
      try {
            const existingStudentSnapshot = await get(ref(database, `child/${childUid}`));
            const courseData = existingStudentSnapshot.val();
            const courseUids = courseData.courseUids || [];
            const classes = [];
            for(const courseUid of courseUids)
            {
              const courseSnapshot = await get(ref(database, `courses/students/${courseUid}`));
              const courseDetail = courseSnapshot.val();
              // Extract relevant details and add to the array
              const classDetail = {
                category: courseDetail.category,
                course: courseDetail.course,
                times: courseDetail.times,
                facultyEmail: courseDetail.faculty,
                childName : courseDetail.student
              };
              classes.push(classDetail);
            }  
            setAttendedClasses(classes);
      } catch (error) {
        console.error("Error fetching data for child with UID", error);
      }
    }

  if(isParent)
  {
    if (userData.child.hasOwnProperty(selectedChild)) 
    {
      const childUid = userData.child[selectedChild];
      fetchData(childUid);
    }
  }
  else
  {
    fetchData(currentUser.uid);
  }

  return (
    <div className="user-profile">
      <div className="profile-content">
        {isParent ? (
          <div>
            <h2>Student Classes</h2>
            <label htmlFor="childDropdown">Select Child:</label>
            <select id="childDropdown" value={selectedChild} onChange={handleChildChange}>
              <option value="">Select Child</option>
              {/* Use dummyChildNames instead of childNames */}
              {childNamesFromData.map((childName) => (
                <option key={childName} value={childName}>
                  {childName}
                </option>
              ))}
            </select>
          </div>
        ) : (
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
                  <th>Date/Time</th>
                  <th>Faculty Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendedClasses.map((attendedClass) => (
                  <tr key={attendedClass.id}>
                    <td>{attendedClass.category}</td>
                    <td>{attendedClass.course}</td>
                    <td>{attendedClass.times}</td>
                    <td>{attendedClass.facultyEmail}</td>
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

export default MyClasses;
