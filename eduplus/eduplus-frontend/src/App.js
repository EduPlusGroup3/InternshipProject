// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage";
import RegistrationPage from "./pages/registrationpage";

const App = () => {
  return (
    <Router>      
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/home" element={<HomePage/>}/>
          <Route exact path="/register" element={<RegistrationPage/>}/>
          </Routes>      
    </Router>
  );
}
export default App;
