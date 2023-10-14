import React, { useState, useEffect } from "react";
import LoginModal from "./loginmodel";
import UserProfile from "./userprofile";
import { useNavigate } from "react-router-dom";
import RescheduleClasses from "./rescheduleclasses";
import Enquiry from "./enquiry";
import ClassesPreferred from "./classespreferred";
import ForgotPasswordModal from "./forgotpassword";
import "../assests/styles/userhomepagestyles.css";
import genioLogo from "../assests/images/genioLogo1.png";
import genioLogoFooter from "../assests/images/genioLogoFooter.png";
import VerticalMenu from "./verticalmenu";
import { useAuth } from "../pages/authcontext";

const UserHomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, login, logout, currentUser } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);  
  const [openModal, setOpenModal] = useState(null);
  const [activeLink, setActiveLink] = useState("home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isClassesPreferOpen, setIsClassesPreferOpen] = useState(false);
  const [isClasRescheduleOpen, setIsClassesRescheduleOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    setActiveLink("home");
    setIsProfileOpen(true);
    setIsClassesPreferOpen(false);
    setIsEnquiryOpen(false);
    setIsClassesRescheduleOpen(false);
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

  const handleNavLinkClick = (link) => {
    if (link === "profile") {
      setIsProfileOpen(true);
      setIsClassesPreferOpen(false);
      setIsEnquiryOpen(false);
      setIsClassesRescheduleOpen(false);
    } else if (link === "classesPreferred") {
      setIsClassesPreferOpen(true);
      setIsProfileOpen(false);
      setIsEnquiryOpen(false);
      setIsClassesRescheduleOpen(false);
    } else if (link === "rescheduleClasses") {
      setIsClassesPreferOpen(false);
      setIsProfileOpen(false);
      setIsEnquiryOpen(false);
      setIsClassesRescheduleOpen(true);
    } else if (link === "enquiry") {
      setIsClassesPreferOpen(false);
      setIsProfileOpen(false);
      setIsEnquiryOpen(true);
      setIsClassesRescheduleOpen(false);
    }else if(link === "contactus"){
      setIsEnquiryOpen(true);
    } 
    else {
      setActiveLink(link);
      setOpenModal(link);
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

  const closeRescheduleClassesModal = () => {
    setIsClassesRescheduleOpen(false);
  };

  const menuItems = [
    { id: "profile", label: "Profile" },
    { id: "classesPreferred", label: "Classes Preferred" },
    { id: "rescheduleClasses", label: "Reschedule Classes" },
    { id: "enquiry", label: "Enquiry" },
  ];

  const isParent = currentUser && currentUser.role === 'parent';

  return (
    <div className="user-home-page">
      <header className="header">     
        <div className="left-section">          
              <span role="img" aria-label="telephone">📞</span> TEL:(+2)03 5832593         
          </div>
          <div className="button-container">          
          {isLoggedIn ? (
              <>
                <span className="login-button">{username}</span>
                <button className="login-button" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="login-button" onClick={openLoginModal}>
                Login
              </button>
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
          {isProfileOpen && <UserProfile onClose={closeProfileModal} username={username} />}
          {isClassesPreferOpen && (
            <ClassesPreferred onClose={closeClassesPreferModal} username={username} />
          )}
          {isEnquiryOpen && <Enquiry onClose={closeEnquiryModal} username={username} />}
          {isClasRescheduleOpen && (
            <RescheduleClasses onClose={closeRescheduleClassesModal} username={username} />
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
          <a href="/userhp" className="footer-nav-link">
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
        onLogin={login}
        openForgotModal={openForgotModal}
      />
      <ForgotPasswordModal isOpen={isForgotModalOpen} onClose={closeForgotModal} />
    </div>
  );
};

export default UserHomePage;
