
import React,{useState, useEffect} from "react";
import LoginModal from "./loginmodel";
import "../assests/styles/homepagestyles.css";
import genioLogo from "../assests/images/genioLogo1.png";
import sliderRobot from "../assests/images/sliderRobot.png";
import k12 from "../assests/images/k12.jpeg";
import genioLogoFooter from "../assests/images/genioLogoFooter.png";
import dummyUsers from "../dummydata/logindummydata";


const HomePage = () => {  
    
        const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [username, setUsername] = useState("");
        const [currentUser, setCurrentUser] = useState(null);     
        const [activeLink, setActiveLink] = useState('home');

        useEffect(() => {
          setActiveLink('home');
        }, []);
      
        const openLoginModal = () => {
          setIsLoginModalOpen(true);
        };
      
        const closeLoginModal = () => {
          setIsLoginModalOpen(false);
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
            setActiveLink(link);
          };


  return (
    <div className="home-page">
      <header className="header">     
      <div className="left-section">          
            <span role="img" aria-label="telephone">📞</span> TEL:(+2)03 5832593         
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
          <span className="pipe">|</span>
          <button className="employee-login-button">Employee Login</button>
        </div>
      </header>
      <span>
        <nav className="navigation">
        <a
          href="#geniotech"
          className={`nav-link ${activeLink === 'geniotech' ? 'active' : ''}`}
          onClick={() => handleNavLinkClick('geniotech')}
        >
          <img src={genioLogo} alt="Genio" style={{ height: 'auto', width: 'auto' }} />
        </a>
        <a
          href="#home"
          className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
          onClick={() => handleNavLinkClick('home')}
        >
          Home
        </a>
        <a
          href="#about"
          className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
          onClick={() => handleNavLinkClick('about')}
        >
          About Us
        </a>
        </nav>
      </span>

      <main>
        <section className="content-section">
          <div className="content">
            <div className="text">              
              <p>INTRODUCE YOUR KID </p>
              <p>TO THE FUTURE</p>
              <p>GENIO-TECH</p>
            </div>
            <div className="image-container">
              <img src={sliderRobot} alt="Description" className="image" />
            </div>
          </div>
        </section>   

        <section className="about-section">
          <h2>About Us</h2>
          <div className="text-container">
             <p>Genio-Tech is an organization founded in 2014 by Eng Ahmed Samir to spread Robotics, Computer Science, and STEM Education in Egypt,<br></br>
             over the last couple of years it became one of the leading STEM education academies in Alexandria and Egypt.</p>
             <p>Genio-Tech advocates change in our young generation's brains. Therefore, our courses vary from simple physics to advanced rocket sciences,<br></br>
             done with a twist of fun and interaction to encourage their curiosity and fuel their desire to learn.</p>
         </div>
        </section>

        <section className="k12-content-section ">
          <div className="content">
              <div className="k12-text">              
                <h1>K - 12</h1>
                <p>Child's experience highly influence brain development in early childhood stages.</p>
                <p>We believe kids can learn anything from simple physics to advanced <br></br>rocket science but the way to do 
                  that has to be a fun interactive way to<br></br> encourage their curiosity and fuel their desire to learn.
                </p>
              </div>
              <div className="image-container">
                <img src={k12} alt="k12" className="image" />
              </div>
            </div>
        </section>


        <section className="contact-section">
                 <div className="contact-column">
                 <h2>Contact Us</h2>
                 <p>If you have any questions or inquiries, feel free to contact us:</p>
                 <h3>Address</h3>
                 <p>258 Abdelsalam Aref Street Louran, Qism El-Raml, Alexandria Governorate</p>
                 </div>
        
                 <div className="contact-column">
                 <h3>Email</h3>
                 <p>info@geniotech.org</p>
                 <h3>Phone</h3>
                 <p>(+2) 0120459771</p>
                 </div>
             </section>


             <span>
            <nav className="footer-navigation">
              <a href="#geniotech" className="footer-nav-link"><img src={genioLogoFooter} alt="GenioFooter" style={{ height: 'auto', width: 'auto' }} /></a>
              <a href="#home" className="footer-nav-link">Home</a>
              <a href="#about" className="footer-nav-link">About Us</a>
            </nav>
      </span>       

      <footer className="footer">
             &copy; 2023 Eduplus. All rights reserved.
      </footer>
      </main>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLogin={handleLogin} users={dummyUsers}/>
      </div>

);
};

export default HomePage;
