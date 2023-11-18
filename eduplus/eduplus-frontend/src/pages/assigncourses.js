import React, { useState, useEffect } from "react";
import "react-time-picker/dist/TimePicker.css";
import "../assests/styles/registrationpagestyles.css";
import categoryData from "../dummydata/categoryData";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref,push, set, get } from "firebase/database";
import { useAuth } from "../pages/authcontext";
import { fetchUserProfileData } from "./firebaseFunctions";
import { v4 as uuidv4 } from 'uuid';


const AssignCourses = () => {
  const categoryList = ["Genio jr bot", "Duplo pieces", "Wedo1","Wedo2.0","Legokit","Kodu software","Scratch Software","EV3Robots","Arduino Kits","Webdevelopment","Programming","Tetrix","Competition training"];
  
  const { Categories } = categoryData;
  const [faculties, setFaculties] = useState([]);
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



  useEffect(() => {
    const database = getDatabase();
    const facultyRef = ref(database, "users/faculty");

    get(facultyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const facultyData = snapshot.val();
          const faculties = Object.values(facultyData).map((faculty) => ({
            id: faculty.id, // replace with your actual user ID field
            name: `${faculty.firstname} ${faculty.lastname}`,
          }));
          setFaculties(faculties)
        }
      })
      .catch((error) => {
        console.error("Error fetching faculty names:", error);
      });
  }, []);
  


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

  const handleTimeChange = (e) => {
    try {
      const parsedTime = new Date(`2000-01-01T${e.target.value}`);
      if (isNaN(parsedTime.getTime())) {
        throw new Error('Invalid time format');
      }
      setSelectedTime(e.target.value);
    } catch (error) {
      console.error('Error setting time:', error);
    }
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
    const database = getDatabase();
    const coursesRef = ref(database, "courses");
  
    const courseData = {
      uid: uuidv4(), // Generate a UUID for the course
      selectedFaculty: selectedFaculty,
      selectedCategory: selectedCategory,
      selectedCourse: selectedCourse,
      courseDate: courseDate,
      selectedTimings: selectedTime,
      courseDescription: courseDescription,
    };
     // Perform asynchronous operation outside the event handler
  const saveCourseData = async () => {
    try {
      const newCourseRef = await push(coursesRef);
      await set(newCourseRef, courseData);
      alert("Courses Assigned");
    } catch (error) {
      console.error("Error assigning courses:", error);
      alert("An error occurred while assigning courses. Please try again.");
    }
  };

  // Trigger the asynchronous operation
  saveCourseData();

    console.log("Submitting data:", {
      faculty: selectedFaculty,
      category: selectedCategory,
      course: selectedCourse,
      date: courseDate,
      times: selectedTime,
      description: courseDescription,
      type:courseType,
      group: selectedGroup,
    });
   // alert("Courses Assigned");
  };

  return (
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
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name}
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
  );
};

export default AssignCourses;
