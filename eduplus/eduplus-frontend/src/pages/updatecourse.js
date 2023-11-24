import React, { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "../assests/styles/registrationpagestyles.css";
import categoryData from "../dummydata/categoryData";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get,child,update } from "firebase/database";
import { useAuth } from "../pages/authcontext";
import { fetchUserProfileData } from "./firebaseFunctions";

const RescheduleCourse = () => {
  const categoryList = [
    "Genio jr bot",
    "Duplo pieces",
    "Wedo1",
    "Wedo2.0",
    "Legokit",
    "Kodu software",
    "Scratch Software",
    "EV3Robots",
    "Arduino Kits",
    "Webdevelopment",
    "Programming",
    "Tetrix",
    "Competition training",
  ];

  const { Categories } = categoryData;

  const [userId, setUserId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [courseDate, setCourseDate] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [modifiedDate, setModifiedDate] = useState("");
  const [modifiedTime, setModifiedTime] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleUpdate = () => {
    setUpdateMode(true);
    togglePopup();
  };

  const handleCancel = () =>{
    setUpdateMode(false);
    togglePopup();
  };

  const handleDelete = () => {
    setShowConfirmation(true); // Open the delete confirmation popup
  };

  const handleConfirmDelete = async () => {
    const db = getDatabase();
    const coursesRef = ref(db, "/courses");
  
    try {
      // Delete the specific course from the database
      await set(child(coursesRef, searchResults.id), null);
  
      alert("Record deleted successfully!");
      setShowConfirmation(false); // Close the delete popup
      setSearchResults(null); // Clear search results after deletion
    } catch (error) {
      console.error("Error deleting the database:", error);
      // Handle the error as needed
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false); // Close the delete popup
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getDatabase();
    const coursesRef = ref(db, "/courses");
    if (updateMode) {
      try {
        // Construct updated data
        const updatedData = {
          courseDate: modifiedDate,
          selectedTimings: modifiedTime,
        };

       // Update the specific course in the database
      await update(child(coursesRef, searchResults.id), updatedData);

        alert("Record updated successfully!");
        setUpdateMode(false); // Exit update mode
        setShowPopup(false); // Close the popup
      } catch (error) {
        console.error("Error updating the database:", error);
        // Handle the error as needed
      }
    } else {
      // Handle search operation
      try {
        const snapshot = await get(coursesRef);

        if (snapshot.exists()) {
          const coursesData = snapshot.val();
          const matchingCourses = Object.entries(coursesData).filter(([courseId, course]) => {
            return (
              course.selectedCategory === selectedCategory &&
              course.selectedCourse === selectedCourse &&
              course.courseDate === courseDate &&
              course.selectedTimings === selectedTime
            );
          });

          if (matchingCourses.length > 0) {
            const [courseId, course] = matchingCourses[0];
            setSearchResults({ id: courseId, ...course });
          } else {
            setSearchResults(null);
          }
        } else {
          setSearchResults(null);
        }
      } catch (error) {
        console.error("Error searching in the database:", error);
      }
    }
  };
  

  return (
    
    <div className="user-profile">
      <h2>Reschedule Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Faculty Email:</label>
          <div className="search-input">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
              onChange={(e) => setSelectedCourse(e.target.value)}
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
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          />
        </div>

        <button type="submit">Search</button>
        
              </form>

      {searchResults ? (
        <div className="search-results">
          <h3>Search Results:</h3>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
            {searchResults.selectedFaculty} {searchResults.selectedCourse}{" "}
        {searchResults.courseDate} {searchResults.selectedTimings}
            </span>
            <span>
              <span
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={handleUpdate}
              >
                Update
              </span>{" "}
              |{" "}
              <span
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={handleDelete}
              >
                Delete
              </span>
            </span>
          </p>
        </div>
      ):(<p>No result found</p>)}

      {showPopup && (
        <div className="popup confirmation-popup">
          <div className="popup-inner">
            <label htmlFor="modifiedDate">Modified Date:</label>
            <input
              type="date"
              id="modifiedDate"
              name="modifiedDate"
              value={modifiedDate}
              onChange={(e) => setModifiedDate(e.target.value)}
              required
            />

            <label htmlFor="modifiedTime">Modified Time:</label>
            <input
              type="time"
              id="modifiedTime"
              name="modifiedTime"
              value={modifiedTime}
              onChange={(e) => setModifiedTime(e.target.value)}
              required
            />

            <button onClick={handleSubmit} className="action-button">Update</button>
            <button onClick={handleCancel} className="action-button">Cancel</button>
          </div>
        </div>
      )}


      {showConfirmation && (
              <div className="popup confirmation-popup">
                <div className="popup-inner">
                  <p>Are you sure you want to delete the record?</p>
                  <div className="button-group">
              <button onClick={handleConfirmDelete} className="action-button">
                Yes
              </button>
              <button onClick={handleCancelDelete} className="action-button">
                No
              </button>
            </div>
                </div>
              </div>
            )}
    </div>
  );
};

export default RescheduleCourse;
