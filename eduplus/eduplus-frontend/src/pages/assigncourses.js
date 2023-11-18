import React, { useState, useEffect } from "react";
import "react-time-picker/dist/TimePicker.css";
import "../assests/styles/registrationpagestyles.css";
import categoryData from "../dummydata/categoryData";
import { useNavigate } from "react-router-dom";
import { getAuth} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { useAuth } from "../pages/authcontext";


const AssignCourses = () => {
  const categoryList = ["Genio jr bot", "Duplo pieces", "Wedo1","Wedo2.0","Legokit","Kodu software","Scratch Software","EV3Robots","Arduino Kits","Webdevelopment","Programming","Tetrix","Competition training"];
  const { v4: uuidv4 } = require('uuid');
  const { Categories } = categoryData;
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [courseDate, setCourseDate] = useState("");
  const [courseDescription, setCourseDescription] = useState(""); 
  const [courseType, setCourseType] = useState(""); 
  const [selectedGroup, setSelectedGroup] = useState("");
  const [availableGroups, setAvailableGroups] = useState(["Group 1", "Group 2"]);
  const [groupsWithStudents, setGroupsWithStudents] = useState({});


  const [courseDescription, setCourseDescription] = useState("");
  const [error, setError] = useState("");
  const [isCourseAdded, setIsCourseAdded] = useState(false);
  const timeSlots = [
    "09:00 AM - 10:30 AM",
    "11:00 AM - 12:30 PM",
    "02:00 PM - 03:30 PM",
    "04:00 PM - 05:30 PM",
  ];

  useEffect(() => {}, []);

  useEffect(() => {
    const database = getDatabase();
    const facultyRef = ref(database, "users/faculty");
  
    get(facultyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const facultyData = snapshot.val();
          const facultyNames = Object.values(facultyData).map(
            (faculty) => `${faculty.firstname} ${faculty.lastname}`
          );
          setSelectedFaculty(facultyNames);
        }
      })
      .catch((error) => {
        console.error("Error fetching faculty names:", error);
      });
  }, []);
  
  const facultyList = [selectedFaculty];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedCourse("");
    setCourseDescription("");
  };

  const handleCourseChange = (course) => {
    const selectedCourseData = Categories.find(
      (category) => category.CategoryName === selectedCategory
    )?.Courses.find((c) => c.CourseName === course);

    setSelectedCourse(course);
    setCourseDescription(selectedCourseData?.Description || "");
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleCourseTypeChange = (type) => {
    setCourseType(type);
    setSelectedGroup("");
  };

  const handleGroupChange = (group) => {   
      setSelectedGroup(group);    
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !selectedFaculty ||
      !selectedCategory ||
      !selectedCourse ||
      !courseDate ||
      !selectedTimings ||
      !courseDescription
    ) {
      setError("All fields are required");
    } else {
      registerCourse();
    }
  };

  const registerCourse = async () => {
    const auth = getAuth();
    try {
        const database = getDatabase();
        const uid = uuidv4();
        const usersRef = ref(database, "courses/" + uid);
        const newCourse = {
          uid: uid,
          selectedFaculty,
          selectedCategory,
          selectedCourse,
          selectedTimings,
          courseDate,
          courseDescription
        };
        await set(usersRef, newCourse);
        setIsCourseAdded(true);
      }catch (error) {
      setError("Error Occured while adding course. Please try again later.");
    }
  };


  return (
    <div className="course-page">
    {isCourseAdded ? (
      <div className="courseAdded-success">
        <h2>Course Assigned!</h2>
        <p>
          Course is assigned to an instructor.
        </p>
      </div>
    ) : (
    <div className="user-profile">
      <h2>Assign Courses to Faculty</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="faculty">Select Faculty:</label>
          <select
            id="faculty"
            name="faculty"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            required
          >
            <option value="">Select Faculty</option>
            {facultyList.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categoryList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="form-group">
            <label htmlFor="course">Select Course:</label>
            <select
              id="course"
              name="course"
              value={selectedCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
              required
            >
              <option value="">Select Course</option>
              {Categories.find(
                (category) => category.CategoryName === selectedCategory
              )?.Courses.map((course) => (
                <option key={course.CourseName} value={course.CourseName}>
                  {course.CourseName}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedCategory && (
          <div className="form-group">
            <label htmlFor="courseDescription">Course Description:</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={courseDescription}
              rows="3"
              cols="50"
              readOnly
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="courseDate">Select Course Date:</label>
          <input
            type="date"
            id="courseDate"
            name="courseDate"
            value={courseDate}
            onChange={(e) => setCourseDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseTime">Select Course Time:</label>
          <input
            type="time"
            id="courseTime"
            name="courseTime"
            value={selectedTime}
            onChange={handleTimeChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseType">Select Course Type:</label>
          <select
            id="courseType"
            name="courseType"
            value={courseType}
            onChange={(e) => handleCourseTypeChange(e.target.value)}
            required
          >
            <option value="">Select Course Type</option>
            <option value="Individual">Individual</option>
            <option value="Group">Group</option>
          </select>
        </div>

        {courseType === "Group" && (
          <div className="form-group">
            <label htmlFor="group">Available Groups:</label>
            <select
              id="group"
              name="group"
              value={selectedGroup}  
              onChange={(e) => handleGroupChange(e.target.value)}
              required
            >
              <option value="">Select Group</option>
              {availableGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit">Assign Courses to Faculty</button>
      </form>
    </div>
  )}
  </div>
  );
};

export default AssignCourses;
