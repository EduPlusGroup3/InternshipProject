import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage";
import RegistrationPage from "./pages/registrationpage";
import AboutUSPage from "./pages/aboutus";
import UserHomePage from "./pages/userhomepage";
import ChildRegistrationPage from "./pages/childRegistration";
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
          <Route exact path="/aboutus" element={<AboutUSPage/>}/>
          <Route exact path="/userhp" element={<UserHomePage/>}/>
          </Routes>  
        </AuthProvider>      
    </Router>
  );
}
export default App;


