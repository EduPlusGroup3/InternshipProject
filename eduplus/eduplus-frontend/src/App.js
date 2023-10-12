
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage";
import RegistrationPage from "./pages/registrationpage";
import AboutUSPage from "./pages/aboutus";
import UserHomePage from "./pages/userhomepage";

const App = () => {
  return (
    <Router>      
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/home" element={<HomePage/>}/>
          <Route exact path="/register" element={<RegistrationPage/>}/>
          <Route exact path="/aboutus" element={<AboutUSPage/>}/>
          <Route exact path="/userhp" element={<UserHomePage/>}/>
          </Routes>      
    </Router>
  );
}
export default App;

