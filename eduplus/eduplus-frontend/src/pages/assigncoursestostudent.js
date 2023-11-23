import React, { useState, useEffect } from "react";
import categoryData from "../dummydata/categoryData";
import { getDatabase, ref,push, set, get } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

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
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
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
  const [isCourseAdded, setIsCourseAdded] = useState(false);
  const [error, setError] = useState("");
  const [courseTiming, setCourseTiming] = useState([]);

  useEffect(() => {
    const groupsData = {
      "Group 1": 3,
      "Group 2": 6,
    };
    setGroupsWithStudents(groupsData);
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const studentRef = ref(database, "child/");

    get(studentRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const studentData = snapshot.val();
          const students = Object.values(studentData).map((student) => ({
            id: student.id, // replace with your actual user ID field
            studentUserName: student.userID,
            studentEmail: student.email,
            studentUid : student.uid
          }));
          setStudents(students);
        }
      })
      .catch((error) => {
        console.error("Error fetching student names:", error);
      });
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const facultyRef = ref(database, "users/faculty");

    get(facultyRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const facultyData = snapshot.val();
          const faculties = Object.values(facultyData).map((faculty) => ({
            id: faculty.id, // replace with your actual user ID field
            //facultyName: `${faculty.firstname} ${faculty.lastname}`,
            facultyEmail: faculty.email,
            facultyUid : faculty.uid,
            courseUids : faculty.courseUids
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
    setAvailableFaculties([]); 
    setSelectedFaculty("");    
    setAvailableTypes([]);     
    setCourseType("");        
  };

  const handleCourseChange = async (course) => {
    const selectedCourseData = Categories.find(
      (category) => category.CategoryName === selectedCategory
    )?.Courses.find((c) => c.CourseName === course);
  
    setSelectedCourse(course);
  
    //const faculties = Object.keys(selectedCourseData?.FacultyTypes || {});
    const matchingFaculties = await findFacultyByCategoryAndCourse (faculties, selectedCategory, course);
    const uniqueArray = [...new Set(matchingFaculties)];
    setAvailableFaculties(uniqueArray);
    setSelectedFaculty("");    
    setAvailableTypes([]);     
    setCourseType("");         
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleFacultyChange = (faculty) => {
    setSelectedFaculty(faculty);
   // Set available course types directly
  setAvailableTypes(["Individual", "Group"]);
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
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const database = getDatabase();
      const courseUid = uuidv4();
      const coursesRef = ref(database, 'courses/students/' + courseUid);
  
      const studentEmail = `${selectedStudent}@eduplus.com`;
      const studentUid = findStudentByEmail(studentEmail);
      const facultyUid = findFacultyByEmail(selectedFaculty);

      // Fetch the existing student data using studentUid
      const existingStudentSnapshot = await get(ref(database, `child/${studentUid}`));
      const existingStudentData = existingStudentSnapshot.val();

      const courseUids = existingStudentData.courseUids || [];
      // Update the student record with the new courseUid
      const updatedStudentData = {
        ...existingStudentData,
        courseUids: [courseUid, ...courseUids],
      };
      await set(ref(database, `child/${studentUid}`), updatedStudentData);

      const courseData = {
        uid: courseUid,
        student: selectedStudent,
        category: selectedCategory,
        course: selectedCourse,
        times: selectedTime,
        faculty: selectedFaculty,
        type: courseType,
        studentUid : studentUid,
        facultyUid : facultyUid
      };
      await set(coursesRef, courseData);
      setIsCourseAdded(true);
      alert("Courses Assigned to Student");
      resetForm();
    }catch (error) {
      setError("Error Occured while adding course to student. Please try again later.");
      console.error("Error adding course:", error);
    }
  };

  const resetForm = () => {
    setSelectedStudent(""); 
    setSelectedCategory("");
    setSelectedCourse("");
    setSelectedTime(""); 
    setSelectedFaculty(""); 
    setCourseType(""); 
   
  };

  // Function to find a student UID by email
  const findStudentByEmail = (email) => {
  const foundStudent = students.find((student) => student.studentEmail === email);
  return foundStudent ?  foundStudent.studentUid : null;
  };

  // Function to find a faculty UID by email
  const findFacultyByEmail = (email) => {
  const foundFaculty = faculties.find((faculty) => faculty.facultyEmail === email);
  return foundFaculty ?  foundFaculty.facultyUid : null;
   };
  
  // Function to fetch course data from Firebase using courseId
  const getCourseDataFromFirebase = async (courseId) => {
  const database = getDatabase();
  const courseRef = ref(database, `courses/${courseId}`);

  try {
    const snapshot = await get(courseRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
  }

  return null;
  };


  // Function to find faculty by Category and Course
  const findFacultyByCategoryAndCourse = async (faculties, selectedCategory, selectedCourse) => {
  const matchingFaculties = [];
  const courseTimeDetail = [];
  for (const faculty of faculties) {
    const courseValues = Object.values(faculty.courseUids)
    for (const courseUid of courseValues) {
      const courseData = await getCourseDataFromFirebase(courseUid);
      if (
        courseData &&
        courseData.selectedCategory === selectedCategory &&
        courseData.selectedCourse === selectedCourse
      ) {
        //console.log("courseType->",courseType);
        const courseDetail = {
          email: faculty.facultyEmail,
          courseType: courseData.courseType,
          timeSlot: courseData.courseDate + " " + courseData.selectedTimings
        };
        courseTimeDetail.push(courseDetail);
        matchingFaculties.push(faculty.facultyEmail);
        //break;
      }
    }
  }
  console.log("courseTimeDetail-->",courseTimeDetail);
  setCourseTiming(courseTimeDetail);
  return matchingFaculties; 
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
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.studentUserName}
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
                <option key={faculty.id} value={faculty.id}>
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
