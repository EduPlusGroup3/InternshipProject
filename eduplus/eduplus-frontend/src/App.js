import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage";
import RegistrationPage from "./pages/registrationpage";
import AboutUSPage from "./pages/aboutus";
import UserHomePage from "./pages/userhomepage";
import AdminHomePage from "./pages/adminhomepage";
import ChildRegistrationPage from "./pages/childRegistration";
import InstructorRegistrationPage from "./pages/instructorRegistration";
import { AuthProvider } from "./pages/authcontext";



const App = () => {
  return (
    <Router>  
      <AuthProvider>         
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/home" element={<HomePage/>}/>
          <Route exact path="/register" element={<RegistrationPage/>}/>
          <Route exact path="/childregister" element={<ChildRegistrationPage/>}/>
          <Route exact path="/instructorregister" element={<InstructorRegistrationPage/>}/>
          <Route exact path="/aboutus" element={<AboutUSPage/>}/>
          <Route exact path="/userhp" element={<UserHomePage/>}/>
          <Route exact path="/adminhp" element={<AdminHomePage/>}/>
          </Routes>           
        </AuthProvider>      
    </Router>
  );
}
export default App;


