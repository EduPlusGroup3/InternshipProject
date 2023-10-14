import React from "react";

const UserProfile = ({ firstname,lastname, email, country, region, gender }) => {
  return (   
    <div className="user-profile">      
        <h2>User Profile</h2>
          <form>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                value={firstname}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                value={lastname}
                readOnly
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                readOnly
              />
            </div>  
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                placeholder="Country"
                value={country}
                readOnly
              >              
            </select>
            </div>
            <div className="form-group">
              <label htmlFor="region">Region</label>
              <input
                type="text"
                id="region"
                name="region"
                placeholder="Region"
                value={region}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={gender}                
                readOnly
              >               
              </select>
            </div>
                
          </form>
          
        </div>
      
   
  );
};

export default UserProfile;
