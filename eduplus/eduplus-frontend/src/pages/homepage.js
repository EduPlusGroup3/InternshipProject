import React,{useState} from "react";
import LoginModal from "./loginmodel";
import "../assests/styles/homepagestyles.css";
import dummyUsers from "../dummydata/logindummydata";


const HomePage = () => {  
    
        const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [username, setUsername] = useState("");
        const [currentUser, setCurrentUser] = useState(null);     
      
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


  return (
    <div className="home-page">
      <header className="header">
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

      <main className="main">
        <section className="about-section">
          <h2>About Us</h2>
          <div className="text-container">
             <p>Genio-Tech is an organization founded in 2014 by Eng Ahmed Samir to spread Robotics, Computer Science, and STEM Education in Egypt,</p>
             <p>over the last couple of years it became one of the leading STEM education academies in Alexandria and Egypt.</p>
             <p>Genio-Tech advocates change in our young generation's brains. Therefore, our courses vary from simple physics to advanced rocket sciences,</p>
             <p>done with a twist of fun and interaction to encourage their curiosity and fuel their desire to learn.</p>
         </div>
        </section>

        <footer className="footer">
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
        </footer>

      </main>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLogin={handleLogin} users={dummyUsers}/>
    </div>
  );
};

export default HomePage;
