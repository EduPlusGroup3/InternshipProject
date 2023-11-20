import React, { useEffect, useState } from "react";
import "../assests/styles/myclassesstyles.css";
import { fetchUserProfileData } from "./firebaseFunctions";
import { useAuth } from "../pages/authcontext";
import { getDatabase, ref, push, set, get } from "firebase/database";

const MyClasses = (
  { onClose, 
    username, 
    classesData, 
    isParent, 
    childNames = [], 
    selectedChild, 
    onChildChange}) => {
  
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

  useEffect(() => {
    if (currentUser) {
      const uid = currentUser.uid;
      const fetchData = async () => {
        const data = await fetchUserProfileData(uid);
        if (data) {
          setUserData(data);
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
              };;
              classes.push(classDetail);
            }  
            setAttendedClasses(classes);
      } catch (error) {
        console.error("Error fetching data for child with UID", error);
      }
    }

  console.log("selectedChild---->", selectedChild);
  const selectedChild1 = "Deepak"

  if(isParent)
  {
    if (userData.child.hasOwnProperty(selectedChild1)) 
    {
      const childUid = userData.child[selectedChild1];
      fetchData(childUid);
    }
  }
  else
  {
    fetchData(currentUser.uid);
  }
  /*
  // Filter attended classes for the selected child
  const filteredAttendedClasses = isParent
    ? allClasses.filter((attendedClass) => attendedClass.childName === selectedChild1)
    : allClasses;

  // Filter upcoming classes for the selected child
  const filteredUpcomingClasses = isParent
    ? classesData.upcoming.filter((upcomingClass) => upcomingClass.childName === selectedChild)
    : classesData.upcoming;
  */
  return (
    <div className="user-profile">
      <div className="profile-content">
        {isParent ? (
          <div>
            <h2>Student Classes</h2>
            <label htmlFor="childDropdown">Select Child:</label>
            <select id="childDropdown" value={selectedChild} onChange={onChildChange}>
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

        <div style={{ marginTop: "10px" }} className="class-box attended-box">
          <h3>Enrolled Classes:</h3>
          <ul>
            {filteredAttendedClasses.map((attendedClass) => (
              <li key={attendedClass.id}>
                {attendedClass.category} - {attendedClass.course} - {attendedClass.times} - {attendedClass.facultyEmail}
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
