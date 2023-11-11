import React, { useState, useEffect } from "react";
import "../assests/styles/registrationpagestyles.css";
import categoryData from "../dummydata/categoryData";

const AssignCourses = () => {
  const categoryList = ["Genio jr bot", "Duplo pieces", "Wedo1","Wedo2.0","Legokit","Kodu software","Scratch Software","EV3Robots","Arduino Kits","Webdevelopment","Programming","Tetrix","Competition training"];
  const facultyList = ["Faculty 1", "Faculty 2", "Faculty 3"];
  const { Categories } = categoryData;

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [courseDate, setCourseDate] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const timeSlots = [
    "09:00 AM - 10:30 AM",
    "11:00 AM - 12:30 PM",
    "02:00 PM - 03:30 PM",
    "04:00 PM - 05:30 PM",
  ];

  useEffect(() => {}, []);

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
    if (selectedTimings.includes(time)) {
      setSelectedTimings((prevTimings) =>
        prevTimings.filter((t) => t !== time)
      );
    } else {
      setSelectedTimings((prevTimings) => [...prevTimings, time]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting data:", {
      faculty: selectedFaculty,
      category: selectedCategory,
      course: selectedCourse,
      date: courseDate,
      times: selectedTimings,
      description: courseDescription,
    });
    alert("Courses Assigned");
  };

  return (
    <div className="user-profile">
      <h2>Assign Courses</h2>
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
          <label htmlFor="courseTimes">Select Course Times:</label>
          <select
            id="courseTimes"
            name="courseTimes"
            multiple
            value={selectedTimings}
            onChange={(e) =>
              handleTimeChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            required
          >
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Assign Courses</button>
      </form>
    </div>
  );
};

export default AssignCourses;
