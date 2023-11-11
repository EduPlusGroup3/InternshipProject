import React, { useState, useEffect } from "react";
import LoginModal from "./loginmodel";
import UserProfile from "./userprofile";
import { useNavigate, Link } from "react-router-dom";
import AddFaculty from "./addfaculty";
import UpdateCourse from "./updatecourse"; 
import UpdateStudent from "./updatestudent";
import AssignCourses from "./assigncourses";
import ForgotPasswordModal from "./forgotpassword";
import "../assests/styles/userhomepagestyles.css";
import genioLogo from "../assests/images/genioLogo1.png";
import genioLogoFooter from "../assests/images/genioLogoFooter.png";
import VerticalMenu from "./verticalmenu";
import { useAuth } from "./authcontext";
import dummyClassesData from "../dummydata/classesAttended";
import { getDatabase, ref, get } from "firebase/database";

const AdminHomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, login, logout, currentUser } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [activeLink, setActiveLink] = useState("home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddFacultyOpen, setAddFacultyOpen] = useState(false);
  const [isAssignCoursesOpen, setAssignCoursesOpen] = useState(false);
  const [isUpdateCoursesOpen, setUpdateCoursesOpen] = useState(false);
  const [isUpdateStudentOpen, setUpdateStudentOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const [uid, setUid] = useState(null);

  useEffect(() => {
    setActiveLink("home");
    setIsProfileOpen(true);
    setAddFacultyOpen(false);
    setAssignCoursesOpen(false)
    setUpdateCoursesOpen(false);
    setUpdateStudentOpen(false);
  }, []);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openForgotModal = () => {
    closeLoginModal();
    setIsForgotModalOpen(true);
  };

  const closeForgotModal = () => {
    setIsForgotModalOpen(false);
  };

  const fetchUserProfileData = async (uid) => {
    if (!uid) {
      console.error("UID is not defined.");
      return;
    }

    const database = getDatabase();
    const userRef = ref(database, `users/${uid}`);

    try {
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        setProfileData(userData);
      } else {
        setProfileData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setProfileData(null);
    }
  };

  useEffect(() => {
    if (isProfileOpen && currentUser) {
      const uid = currentUser.uid;
      fetchUserProfileData(uid);
      setUid(uid);
    }
  }, [isProfileOpen, currentUser]);

  const handleNavLinkClick = (link) => {
    if (link === "profile") {
      setIsProfileOpen(true);
      setOpenModal(null);
      setAddFacultyOpen(false);
      setUpdateCoursesOpen(false);
      setUpdateStudentOpen(false);
      setAssignCoursesOpen(false);
    } else if (link === "addfaculty") {
      setIsProfileOpen(false);
      setAddFacultyOpen(true);
      setUpdateCoursesOpen(false);
      setUpdateStudentOpen(false);
      setAssignCoursesOpen(false);
    } else if (link === "updatecourses") {
      setIsProfileOpen(false);
      setAddFacultyOpen(false);
      setUpdateCoursesOpen(true);
      setUpdateStudentOpen(false);
      setAssignCoursesOpen(false);
    } else if (link === "updatestudent") {
      setIsProfileOpen(false);
      setAddFacultyOpen(false);
      setUpdateCoursesOpen(false);
      setUpdateStudentOpen(true);
      setAssignCoursesOpen(false);
    } else if (link === "assigncourses") {
      setIsProfileOpen(false);
      setAddFacultyOpen(false);
      setUpdateCoursesOpen(false);
      setUpdateStudentOpen(false);
      setAssignCoursesOpen(true);
    } else {
      setActiveLink(link);
      setOpenModal(link);
      setIsProfileOpen(false);
    }
  };

  const closeProfileModal = () => {
    setIsProfileOpen(false);
  };

  const closeAddFacultyModal = () => {
    setAddFacultyOpen(false);
  };

  const closeAssignCoursesModal = () => {
    setAssignCoursesOpen(false);
  };

  const closeUpdateCoursesModal = () => {
    setUpdateCoursesOpen(false);
  };

  const closeUpdateStudentModal = () => {
    setUpdateStudentOpen(false);
  };

  const menuItems = [
    { id: "profile", label: "Profile" },
    { id: "addfaculty", label: "Add/Update Faculty" },
    { id: "assigncourses", label: "Assign Courses" },
    { id: "updatecourses", label: "Update Classes" },
    { id: "updatestudent", label: "Update Student" },
  ];

  const isParent = currentUser && currentUser.role === 'parent';
  const isAdmin = currentUser && currentUser.role === 'admin';

  const handleLogin = (userData) => {
    login(userData);
    setUid(userData.uid);
  };

  return (
    <div className="user-home-page">
      <header className="header">
        <div className="left-section">
          <span role="img" aria-label="telephone">📞</span> TEL:(+2)03 5832593
        </div>
        <div className="button-container">          
        {isLoggedIn ? (
            <>
          {isAdmin ? (
                <Link to="/adminhp" className="login-button">{username}</Link>
              ) : (
                <Link to="/userhp" className="login-button">{username}</Link>
              )}
              <button className="login-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button className="login-button" onClick={openLoginModal}>
              Login
            </button>
          )}
          {isAdmin && ( <span className="pipe">|</span>)}
          {isAdmin && (
                        <button className="employee-login-button" onClick={() => navigate("/instructorregister")}>Instructor Registration</button>
                    )}
          {isParent && ( <span className="pipe">|</span>)}
          {isParent && (
                        <button className="employee-login-button" onClick={() => navigate("/childregister")}>Child Registration</button>
                    )}              
        </div>
      </header>
      <span>
        <nav className="userhpnavigation">
          <a
            href="/home"
            className={`hpnav-link ${activeLink === "geniotech" ? "active" : ""}`}
            onClick={() => handleNavLinkClick("geniotech")}
          >
            <img src={genioLogo} alt="Genio" style={{ height: "auto", width: "auto" }} />
          </a>
          <a
            href="/home"
            className={`hpnav-link ${activeLink === "home" ? "active" : ""}`}
            onClick={() => handleNavLinkClick("home")}
          >
            Home
          </a>
          <a
            href="/aboutus"
            className={`hpnav-link ${activeLink === "about" ? "active" : ""}`}
            onClick={() => handleNavLinkClick("about")}
          >
            About Us
          </a>
        </nav>
      </span>

      <main className="userhpmain">
        <section className="menu-section">
          <VerticalMenu
            items={menuItems}
            activeItem={openModal}
            onItemClick={(item) => handleNavLinkClick(item)}
          />
          {isProfileOpen && <UserProfile
            isProfileOpen={isProfileOpen}
            onClose={closeProfileModal}
            username={username}
            profileData={profileData}
          />}
          {isAddFacultyOpen && (
            <AddFaculty onClose={closeAddFacultyModal} username={username} />
          )}
          {isAssignCoursesOpen && (
            <AssignCourses onClose={closeAssignCoursesModal} username={username} />
          )}
          {isUpdateCoursesOpen && (
            <UpdateCourse onClose={closeUpdateCoursesModal} username={username} uid={uid} />
          )}          
          {isUpdateStudentOpen && (
            <UpdateStudent onClose={closeUpdateStudentModal} username={username} classesData={dummyClassesData} />
          )}
        </section>
      </main>

      <span>
        <nav className="footer-navigation">
          <a href="/home" className="footer-nav-link">
            <img
              src={genioLogoFooter}
              alt="GenioFooter"
              style={{ height: "auto", width: "auto" }}
            />
          </a>
          <a href="/home" className="footer-nav-link">
            Home
          </a>
          <a href="/aboutus" className="footer-nav-link">
            About Us
          </a>
        </nav>
      </span>

      <footer className="footer">&copy; 2023 Eduplus. All rights reserved.</footer>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={handleLogin}
        openForgotModal={openForgotModal}
      />
      <ForgotPasswordModal isOpen={isForgotModalOpen} onClose={closeForgotModal} />
    </div>
  );
};

export default AdminHomePage;
