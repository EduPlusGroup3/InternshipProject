import React, { useState, useEffect } from "react";
import LoginModal from "./loginmodel";
import UserProfile from "./userprofile";
import { useNavigate,Link } from "react-router-dom";
import MyClasses from "./myclasses";
import FacultyClasses from "./facultyclasses";
import EnquiryModal from "./enquiry"; 
import ClassesPreferred from "./classespreferred";
import ForgotPasswordModal from "./forgotpassword";
import Attendance from "./attendance";
import "../assests/styles/userhomepagestyles.css";
import genioLogo from "../assests/images/genioLogo1.png";
import genioLogoFooter from "../assests/images/genioLogoFooter.png";
import VerticalMenu from "./verticalmenu";
import { useAuth } from "../pages/authcontext";
import dummyClassesData from "../dummydata/classesAttended";
import { getDatabase, ref, get } from "firebase/database";

const UserHomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, login, logout, currentUser } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [activeLink, setActiveLink] = useState("home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isClassesPreferOpen, setIsClassesPreferOpen] = useState(false);
  const [ismyClassesOpen, setIsMyClassesOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isFacultyClassesOpen, setIsFacultyClassesOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const [uid, setUid] = useState(null);

  useEffect(() => {
    setActiveLink("home");
    setIsProfileOpen(true);
    setIsClassesPreferOpen(false);
    setIsEnquiryOpen(false);
    setIsMyClassesOpen(false);
    setIsAttendanceOpen(false);
    setIsFacultyClassesOpen(false);
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
      setIsClassesPreferOpen(false);
      setIsEnquiryOpen(false);
      setIsMyClassesOpen(false);
      setIsAttendanceOpen(false)
      setIsFacultyClassesOpen(false)
    } else if (link === "classesPreferred") {
      setIsClassesPreferOpen(true);
      setIsProfileOpen(false);
      setIsEnquiryOpen(false);
      setIsMyClassesOpen(false);
      setIsAttendanceOpen(false)
      setIsFacultyClassesOpen(false)
    } else if (link === "myclasses") {
      setIsClassesPreferOpen(false);
      setIsProfileOpen(false);
      setIsEnquiryOpen(false);
      setIsMyClassesOpen(true);
      setIsAttendanceOpen(false)
      setIsFacultyClassesOpen(false)
    } else if (link === "enquiry") {
      setIsClassesPreferOpen(false);
      setIsProfileOpen(false);
      setIsEnquiryOpen(true);
      setIsMyClassesOpen(false);
      setIsAttendanceOpen(false)
      setIsFacultyClassesOpen(false)
    } 
    else if (link === "attendance") {
      setIsClassesPreferOpen(false);
      setIsProfileOpen(false);
      setIsEnquiryOpen(false);
      setIsMyClassesOpen(false);
      setIsAttendanceOpen(true)
      setIsFacultyClassesOpen(false)
    }else if (link === "facultyClasses") {
      setIsClassesPreferOpen(false);
      setIsProfileOpen(false);
      setIsEnquiryOpen(false);
      setIsMyClassesOpen(false);
      setIsAttendanceOpen(false)
      setIsFacultyClassesOpen(true)
    } else {
      setActiveLink(link);
      setOpenModal(link);
      setIsProfileOpen(false);
    }
  };

  const closeProfileModal = () => {
    setIsProfileOpen(false);
  };

  const closeClassesPreferModal = () => {
    setIsClassesPreferOpen(false);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryOpen(false);
  };

  const closeMyClassesModal = () => {
    setIsMyClassesOpen(false);
  };

  const closeAttendanceModal = () => {
    setIsAttendanceOpen(false);
  };

  const closeFacultyClassesModal = () => {
    setIsFacultyClassesOpen(false);
  };

  const isParent = currentUser && currentUser.role === 'parent';
  const isAdmin = currentUser && currentUser.role === 'admin';
  const isInstructor = currentUser && currentUser.role === 'instructor';
  const isStudent = currentUser && currentUser.role === 'student';

  const menuItems = [
  { id: "profile", label: "Profile" },
  { 
    id: "classesPreferred", 
    label: isParent ? "Available Courses" : "Classes Preferred",
    hidden: isInstructor,
  },
  { id: "facultyClasses", label: "Faculty Classes",
    hidden:isAdmin||isParent||isStudent
  },
  { id: "myclasses", label: isParent ? "Student Classes" : "My Classes",
    hidden: isInstructor
  },
  {
    id: "attendance", label:"Attendance",
    hidden: isParent || isStudent,
  },
  { id: "enquiry", label: "Enquiry" },
 
];

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
            items={menuItems.filter(item => !item.hidden)}
            activeItem={openModal}
            onItemClick={(item) => handleNavLinkClick(item)}
          />
          {isProfileOpen && <UserProfile
            isProfileOpen={isProfileOpen}
            onClose={closeProfileModal}
            username={username}
            profileData={profileData}
          />}
          {isClassesPreferOpen && !isInstructor && (
            <ClassesPreferred onClose={closeClassesPreferModal} username={username} isParent={isParent}/>
          )}
          {isEnquiryOpen && (
            <EnquiryModal onClose={closeEnquiryModal} username={username} uid={uid} />
          )}
          {ismyClassesOpen && (
            <MyClasses onClose={closeMyClassesModal} username={username} classesData={dummyClassesData} isParent={isParent} />
          )}         
          {isAttendanceOpen && (
            <Attendance onClose={closeAttendanceModal} username={username} classesData={dummyClassesData} />
          )}
          {isFacultyClassesOpen && (
            <FacultyClasses onClose={closeFacultyClassesModal} username={username} classesData={dummyClassesData} />
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

export default UserHomePage;
