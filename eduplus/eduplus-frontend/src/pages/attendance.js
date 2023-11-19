import React, { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "../assests/styles/registrationpagestyles.css";
import categoryData from "../dummydata/categoryData";


const Attendance = () => {
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
  const [attendanceData, setAttendanceData] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy list of students attending the course
    const dummyStudents = [
      { id: 1, name: "Student 1" },
      { id: 2, name: "Student 2" },
      { id: 3, name: "Student 3" },
    ];

    // Set the search results with the dummy data
    setSearchResults({ students: dummyStudents });
  };

  const handleCheckboxChange = (studentId, checked) => {
    // Update the attendance data based on checkbox changes
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === studentId ? { ...student, present: checked } : student
      )
    );
  };

  const handleAttendanceSubmit = () => {
    fetch("/api/submitAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Attendance data submitted successfully:", data);
       
      })
      .catch((error) => {
        console.error("Error submitting attendance data:", error);
      });
  };

  return (    
    <div className="user-profile">
      <h2>Attendance</h2>
      <form onSubmit={handleSubmit}>
       

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

              {searchResults && (
        <div className="search-results">
          <h3>Select the students Present for the class:</h3>
          {/* Display the list of students with checkboxes */}
          {searchResults.students.map((student) => (           
            <div key={student.id} className="attendance-row">
              <label>
                <input
                  type="checkbox"
                  checked={student.present}
                  onChange={(e) =>
                    handleCheckboxChange(student.id, e.target.checked)
                  }
                />
                {student.name}
              </label>
            </div>
          ))}  

           <button onClick={handleAttendanceSubmit} className="action-button">Submit Attendance</button>        
        </div>
      )}
    

      
    </div>
  );
};

export default Attendance;
