import React, { useState, useEffect } from "react";
import categoryData from "../dummydata/categoryData";
import { getDatabase, ref, get } from "firebase/database";

const AssignCoursesToStudent = () => {
  const fetchTimeSlotsForGroup = (group) => {

    if (group === "Group 1") {
      return [
        "2023-11-17 10:00 AM",
        "2023-11-18 02:30 PM",
        "2023-11-19 11:15 AM",
      ];
    } else if (group === "Group 2") {
      return [
        "2023-11-20 09:00 AM",
        "2023-11-21 03:45 PM",
        "2023-11-22 01:30 PM",
      ];
    } else {
      return [];
    }
  };
  

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

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [courseDate, setCourseDate] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [availableFaculties, setAvailableFaculties] = useState([]);
  const [courseType, setCourseType] = useState("");
  const [availableTypes, setAvailableTypes] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [availableGroups, setAvailableGroups] = useState(["Group 1", "Group 2"]);
  const [groupsWithStudents, setGroupsWithStudents] = useState({});
  const [dummyTimeSlots, setDummyTimeSlots] = useState([
    "2023-11-17 10:00 AM",
    "2023-11-18 02:30 PM",
    "2023-11-19 11:15 AM",
  ]);

  useEffect(() => {
    const groupsData = {
      "Group 1": 3,
      "Group 2": 6,
    };
    setGroupsWithStudents(groupsData);
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const studentRef = ref(database, "users/student");

    get(studentRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const studentData = snapshot.val();
          const studentNames = Object.values(studentData).map(
            (student) => `${student.firstname} ${student.lastname}`
          );
          setSelectedStudent(studentNames);
        }
      })
      .catch((error) => {
        console.error("Error fetching student names:", error);
      });
  }, []);

  const studentList = [selectedStudent];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedCourse("");
    setAvailableFaculties([]); 
    setSelectedFaculty("");    
    setAvailableTypes([]);     
    setCourseType("");        
  };

  const handleCourseChange = (course) => {
    const selectedCourseData = Categories.find(
      (category) => category.CategoryName === selectedCategory
    )?.Courses.find((c) => c.CourseName === course);
  
    setSelectedCourse(course);
  
    const faculties = Object.keys(selectedCourseData?.FacultyTypes || {});
    setAvailableFaculties(faculties);
    setSelectedFaculty("");    
    setAvailableTypes([]);     
    setCourseType("");         
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleFacultyChange = (faculty) => {
    setSelectedFaculty(faculty);
    setAvailableTypes([]);     

    setAvailableTypes(
      Categories.find(
        (category) => category.CategoryName === selectedCategory
      )?.Courses.find((course) => course.CourseName === selectedCourse)?.FacultyTypes[faculty] || []
    );
    setCourseType("");         
  };

  const handleCourseTypeChange = (type) => {
    setCourseType(type);
    setSelectedGroup("");    
    if (type === "Individual") {
      setDummyTimeSlots([
        "2023-11-20 09:00 AM",
        "2023-11-21 03:45 PM",
        "2023-11-22 01:30 PM",
      ]);
    }
  };

  const handleGroupChange = (group) => {
    if (groupsWithStudents[group] <= 5) {
      console.log("Selected Group:", group);
  
      setSelectedGroup(group);
  
      const groupTimeSlots = fetchTimeSlotsForGroup(group);
      console.log("Group Time Slots:", groupTimeSlots);
  
      setDummyTimeSlots(groupTimeSlots);
      console.log("Selected Time:", selectedTime);
      setSelectedTime([]);
    } else {
      setSelectedGroup("");
      setSelectedTime([]);
      alert("This group has more than 5 students and is unavailable.");
    }
  };  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting data:", {
      student: studentList,
      category: selectedCategory,
      course: selectedCourse,
      date: courseDate,
      times: selectedTime,
      faculty: selectedFaculty,
      type: courseType,
      group: selectedGroup,
    });
    alert("Courses Assigned");
  };

  return (
    <div className="user-profile">
      <h2>Assign Courses to Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="faculty">Select Student:</label>
          <select
            id="faculty"
            name="faculty"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
          >
            <option value="">Select Student</option>
            {studentList.map((student) => (
              <option key={student} value={student}>
                {student}
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
            <label htmlFor="faculties">Select Faculty:</label>
            <select
              id="faculties"
              name="faculties"
              value={selectedFaculty}
              onChange={(e) => handleFacultyChange(e.target.value)}
              required
            >
              <option value="">Select Faculty</option>
              {availableFaculties.map((faculty) => (
                <option key={faculty} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedCategory && selectedFaculty && (
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
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

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
              <option value="" disabled>Select Group</option>
              {availableGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        )}

        {courseType === "Group" && selectedGroup && (
        <div className="form-group">
          <label htmlFor="group">Available Time Slots:</label>         
            {dummyTimeSlots.map((time, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <input
                  type="radio"
                  id={`timeSlot${index}`}
                  name="timeSlot"
                  value={time}
                  checked={selectedTime === time}
                  onChange={() => handleTimeChange(time)}
                />
                <label htmlFor={`timeSlot${index}`}>{time}</label>
                </div>
            ))}          
        </div>
      )}

        {courseType === "Individual" && (
          <div className="form-group">
            <label>Available Time Slots:</label>
            {dummyTimeSlots.map((time, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <input
                  type="radio"
                  id={`timeSlot${index}`}
                  name="timeSlot"
                  value={time}
                  checked={selectedTime === time}
                  onChange={() => handleTimeChange(time)}
                />
                <label htmlFor={`timeSlot${index}`}>{time}</label>
              </div>
            ))}
          </div>
        )}

        <button type="submit">Assign</button>
      </form>
    </div>
  );
};

export default AssignCoursesToStudent;
