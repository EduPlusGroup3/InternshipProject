
import React,{useState, useEffect} from "react";
import LoginModal from "./loginmodel";
import ForgotPasswordModal  from "./forgotpassword";
import "../assests/styles/aboutusstyles.css";
import { useNavigate } from "react-router-dom";
import genioLogo from "../assests/images/genioLogo1.png";
import finalhome from "../assests/images/finalhome.png";
import genioLogoFooter from "../assests/images/genioLogoFooter.png";
import bgtechnoKids from "../assests/images/backgroundtechnokids.jpg";
import { useAuth } from "../pages/authcontext";


const AboutUSPage = () => {  
        const navigate = useNavigate();
        const { isLoggedIn, username, login, logout, currentUser } = useAuth();
        const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);  
        const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
        const [activeLink, setActiveLink] = useState('home');

        useEffect(() => {
          console.log("isLoggedIn:", isLoggedIn);
        console.log("username:", username);
        console.log("currentUser:", currentUser);
          setActiveLink('home');
        }, [isLoggedIn, username, currentUser]);
      
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
            setActiveLink(link);
          };

          const isParent = currentUser && currentUser.role === 'parent';


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
        <nav className="navigation">
        <a
          href="/home"
          className={`nav-link ${activeLink === 'geniotech' ? 'active' : ''}`}
          onClick={() => handleNavLinkClick('geniotech')}
        >
          <img src={genioLogo} alt="Genio" style={{ height: 'auto', width: 'auto' }} />
        </a>
        <a
          href="/userhp"
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

        <section className="about-section">
          <h2>About Genio Tech</h2>
          <div className="text-container">
             <p>Genio-Tech is an organization founded in 2014 by Eng Ahmed Samir to spread Robotics, Computer Science, and STEM Education in Egypt,<br></br>
             over the last couple of years it became one of the leading STEM education academies in Alexandria and Egypt.</p>
             <p>Technology affects ebery field of or life, its not just about computers, smart phones or Tablets anymore, It's about <br></br>
             health care, medicine energy , space research , entertainment , transportation , and even far things like contact lenses you put in your eyes and have camera in them.
             </p>

              <img src={finalhome} alt="Description" />

              <p>Genio-Tech advocates change in our young generation's brains. Therefore, our courses vary from simple physics to advanced
                rocket sciences,<br></br> done with a twist of fun and interactionto encourage their curiosity and fuel their desire to learn.
              </p>
              <p>
                Science, Technology and Engineering and Math is a way to develop our kid's brain to teach them in different ways of thinking 
                which will make them<br></br> unique, starting from communication skills, core values , self-confidence, analytical, logical thinking and problem solving
                which will make them see<br></br> everyday problems from different prospective to deal with them easily.
              </p>
            </div>
           
            <h2>About the Founder</h2>
            <div className="text-container">
            <p>Eng/Ahmed Samir is the founder of Genio-Tech. With more than ten years of experience in stem education and Engineering
              an entrepreneur who always believed<br></br> in the power of youth and their capabilities of changing the world.
            </p>
         </div>
        </section>

        <section className="bg_technokids-section ">       
             
         <img src={bgtechnoKids} alt="technoKids" className="k12image" />
              
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
              <a href="/home" className="footer-nav-link"><img src={genioLogoFooter} alt="GenioFooter" style={{ height: 'auto', width: 'auto' }} /></a>
              <a href="/userhp" className="footer-nav-link">Home</a>
              <a href="/aboutus" className="footer-nav-link">About Us</a>
            </nav>
      </span>       

      <footer className="footer">
             &copy; 2023 Eduplus. All rights reserved.
      </footer>
      </main>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLogin={login} openForgotModal={openForgotModal}/>
      <ForgotPasswordModal isOpen={isForgotModalOpen} onClose={closeForgotModal} />
    </div>
     

);
};

export default AboutUSPage;
