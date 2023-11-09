import React, { useState, useEffect } from "react";
import countriesList from '../dummydata/countries';
import { getDatabase, ref, get } from "firebase/database";
import emailjs from "emailjs-com"; // Import EmailJS library

const EnquiryModal = ({ onClose, uid }) => {
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const maxWords = 1000;

  useEffect(() => {
    setCountries(countriesList);

    if (uid) {
      const database = getDatabase();
      const userDataRef = ref(database, `users/${uid}`);

      get(userDataRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setEmail(userData.email || "");
            setContactNo(userData.contactNo || "");
            setCountry(userData.country || "");
            setRegion(userData.region || "");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [uid]);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (contactNo && !/^\d+$/.test(contactNo)) {
      newErrors.contactNo = "Invalid contact number";
    }

    if (!country) {
      newErrors.country = "Country is required";
    }

    if (!subject) {
      newErrors.subject = "Subject is required";
    }

    if (!message) {
      newErrors.message = "Message is required";
    } else if (countWords(message) > maxWords) {
      newErrors.message = `Message must be ${maxWords} words or fewer`;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const countWords = (text) => {
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  };

  const handleSend = () => {
    if (validateForm()) {
      // Define your EmailJS parameters
      const serviceID = "service_3zeudls";
      const templateID = "template_sjgnnwa";
      const userID = "00gryQEO6fb36Zu7D";

      // Use the EmailJS send function to send the email
      emailjs.send(serviceID, templateID, {
        email,
        contactNo,
        country,
        region,
        subject,
        message
      }, userID)
        .then(function (response) {
          console.log("Email sent successfully", response);
        })
        .catch(function (error) {
          console.error("Error sending email:", error);
        });

      // Reset the form fields
      setEmail("");
      setContactNo("");
      setCountry("");
      setRegion("");
      setSubject("");
      setMessage("");
    }
  };

  return (
    <div className="user-profile">
      <h2>Enquiry Form</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:<span className="asteriskColor">*</span></label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="contactNo">Contact No:</label>
          <input
            type="tel"
            id="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
          />
          {errors.contactNo && <p className="error">{errors.contactNo}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country<span className="asteriskColor">*</span></label>
          <select
            id="country"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countriesList.map((countryOption) => (
              <option key={countryOption} value={countryOption}>
                {countryOption}
              </option>
            ))}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="region">State/Province:</label>
          <input
            type="text"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />
          {errors.region && <p className="error">{errors.region}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:<span className="asteriskColor">*</span></label>
          <select
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select Option</option>
            <option value="payment">Payment Related Issues</option>
            <option value="rescheduleClasses">Rescheduling Classes</option>
            <option value="changeFaculty">Change Faculty</option>
            <option value="courseRelatedIssues">Course Related Issues</option>
            <option value="courseRegistrationIssues">Course Registration</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && <p className="error">{errors.subject}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:<span className="asteriskColor">*</span></label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="2"
            cols="50"
            placeholder=" upto 1000 words max"
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <button type="button" onClick={handleSend}>
          Send
        </button>
      </form>
    </div>
  );
};

export default EnquiryModal;
