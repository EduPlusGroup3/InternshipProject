import React, { useState, useEffect } from "react";
import LoginModal from "./loginmodel";
import UserProfile from "./userprofile";
import RescheduleClasses from "./rescheduleclasses";
import MyClasses from "./myclasses";
import ClassesPreferred from "./classespreferred";
import ForgotPasswordModal from "./forgotpassword";
import "../assests/styles/userhomepagestyles.css";
import genioLogo from "../assests/images/genioLogo1.png";
import genioLogoFooter from "../assests/images/genioLogoFooter.png";
import VerticalMenu from "./verticalmenu";

const UserHomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [activeLink, setActiveLink] = useState("home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isClassesPreferOpen, setIsClassesPreferOpen] = useState(false);
  const [isClasRescheduleOpen, setIsClassesRescheduleOpen] = useState(false);
  const [isMyClassesOpen, setIsMyClassesOpen] = useState(false);

  useEffect(() => {
    setActiveLink("home");
    setIsProfileOpen(true);
    setIsClassesPreferOpen(false);
    setIsMyClassesOpen(false);
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

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user.username);
    setCurrentUser(user);
    closeLoginModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setCurrentUser(null);
  };

  const handleNavLinkClick = (link) => {
    if (link === "profile") {
      setIsProfileOpen(true);
      setIsClassesPreferOpen(false);
      setIsMyClassesOpen(false);
      setIsClassesRescheduleOpen(false);
    } else if (link === "classesPreferred") {
      setIsClassesPreferOpen(true);
      setIsProfileOpen(false);
      setIsMyClassesOpen(false);
      setIsClassesRescheduleOpen(false);
    } else if (link === "rescheduleClasses") {
      setIsClassesPreferOpen(false);
      setIsProfileOpen(false);
      setIsMyClassesOpen(false);
      setIsClassesRescheduleOpen(true);
    } else if (link === "myClasses") {
      setIsClassesPreferOpen(false);
      setIsProfileOpen(false);
      setIsMyClassesOpen(true);
      setIsClassesRescheduleOpen(false);
    } else {
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

  const closeMyClassesModal = () => {
    setIsMyClassesOpen(false);
  };

  const closeRescheduleClassesModal = () => {
    setIsClassesRescheduleOpen(false);
  };

  const menuItems = [
    { id: "profile", label: "Profile" },
    { id: "classesPreferred", label: "Classes Preferred" },
    { id: "rescheduleClasses", label: "Reschedule Classes" },
    { id: "myClasses", label: "My Classes" },
  ];

  return (
    <div className="home-page">
      <header className="header">
        <div className="left-section">
          <span role="img" aria-label="telephone">
            📞
          </span>{" "}
          TEL:(+2)03 5832593
        </div>
        <div className="button-container">
          {isLoggedIn ? (
            <>
              <span className="login-button">{username}</span>
              <button className="login-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="login-button" onClick={openLoginModal}>
              Login
            </button>
          )}
        </div>
      </header>
      <span>
        <nav className="navigation">
          <a
            href="/home"
            className={`nav-link ${activeLink === "geniotech" ? "active" : ""}`}
            onClick={() => handleNavLinkClick("geniotech")}
          >
            <img src={genioLogo} alt="Genio" style={{ height: "auto", width: "auto" }} />
          </a>
          <a
            href="/home"
            className={`nav-link ${activeLink === "home" ? "active" : ""}`}
            onClick={() => handleNavLinkClick("home")}
          >
            Home
          </a>
          <a
            href="/aboutus"
            className={`nav-link ${activeLink === "about" ? "active" : ""}`}
            onClick={() => handleNavLinkClick("about")}
          >
            About Us
          </a>
        </nav>
      </span>

      <main className="main">
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
          {isMyClassesOpen && <MyClasses onClose={closeMyClassesModal} username={username} />}
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