import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import "./QuoteButton.css";
import FormSection from "../../sections/Contact/formSection";

const QuoteForm = ({ isOpen, togglePopup }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    organisation: "",
    enquiry: "",
    message: "",
    honeypot: "", 
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission state
  const formRef = useRef(null);

  // Regex patterns
  const mob_regx = /^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/; // Phone number format
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Email format
  const alpha_allwd = /^[A-Za-z ]+$/; // Only alphabets for name and organization

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Honeypot validation (if filled, it's a bot)
    if (formData.honeypot) {
      newErrors.honeypot = "Spam detected";
      return false; // Prevent submission if honeypot is filled
    }

    // Name validation (Only alphabets allowed)
    if (!formData.name) newErrors.name = "Name is required";
    else if (!alpha_allwd.test(formData.name)) newErrors.name = "Name should contain only alphabets";

    // Phone validation (Indian phone number format)
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!mob_regx.test(formData.phone)) newErrors.phone = "Invalid phone number format";

    // Email validation (Standard email format)
    if (!formData.email) newErrors.email = "Email is required";
    else if (!mailformat.test(formData.email)) newErrors.email = "Invalid email format";

    // Organisation validation (Only alphabets allowed)
    if (!formData.organisation) newErrors.organisation = "Organisation is required";
    else if (!alpha_allwd.test(formData.organisation)) newErrors.organisation = "Organisation should contain only alphabets";

    // Enquiry type validation
    if (!formData.enquiry) newErrors.enquiry = "Type of enquiry is required";
    
    // Message validation
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      fetch(
        "https://script.google.com/macros/s/AKfycbwOP9_uQMoUzUQMbgzEzHir-fhe5FLJACsEfhFfWGxhXnpmfZTvZF-5lcFLuFRMeUni/exec",
        {
          method: "POST",
          body: new FormData(formRef.current),
        }
      )
        .then((res) => {
          console.log("SUCCESSFULLY SUBMITTED TO GOOGLE SHEETS");
        })
        .catch((err) => console.log("Error submitting to Google Sheets:", err));

      emailjs
        .sendForm(
          "service_7xurfxj",
          "template_u6s227l",
          formRef.current,
          "SsPYHKCapw4h-xBn_"
        )
        .then((result) => {
          console.log("Email sent:", result.text);
          setSuccessMessage("Your Message has been sent successfully"); // Set success message state
          setIsSubmitted(true); // Mark the form as submitted
          setFormData({
            // Reset the form data
            name: "",
            phone: "",
            email: "",
            organisation: "",
            enquiry: "",
            message: "",
            honeypot: "", // Reset honeypot field
          });
          setErrors({}); // Clear any errors
        })
        .catch((error) => {
          console.log("Error sending email:", error.text);
          setSuccessMessage(`Error: ${error.text}`); // Set error message in the state
        });
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div className="popupParent">
      {isOpen && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-form" onClick={(e) => e.stopPropagation()}>
            <h2>Let's Connect</h2>

            {/* Show the form or success message based on the submission status */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="inputDiv">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="inputDiv">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.phone && (
                    <p className="error-message">{errors.phone}</p>
                  )}
                </div>

                <div className="inputDiv">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email}</p>
                  )}
                </div>

                <div className="inputDiv">
                  <label>Organisation</label>
                  <input
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.organisation && (
                    <p className="error-message">{errors.organisation}</p>
                  )}
                </div>

                <div className="inputDiv">
                  <label>Type of Enquiry</label>
                  <select
                    name="enquiry"
                    value={formData.enquiry}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="" disabled>
                      You are interested in
                    </option>
                    <option value="Warehousing Solution">
                      Warehousing Solution
                    </option>
                    <option value="Free Trade Zone">
                      Free Trade Zone
                    </option>
                    <option value="Surface & Rail Transport">
                      Surface & Rail Transport
                    </option>
                    <option value="Custom Brokerage">
                      Custom Brokerage
                    </option>
                    <option value="Custom & Foreign Trade Compliance">
                      Custom & Foreign Trade Compliance
                    </option>
                    <option value="Import Management">
                      Import Management
                    </option>
                    <option value="Tech-Driven Last-Mile Delivery">
                      Tech-Driven Last-Mile Delivery
                    </option>
                  </select>
                  {errors.enquiry && (
                    <p className="error-message">{errors.enquiry}</p>
                  )}
                </div>

                <div className="inputDiv">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.message && (
                    <p className="error-message">{errors.message}</p>
                  )}
                </div>

                {/* Hidden honeypot field */}
                <div style={{ display: "none" }}>
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            ) : (
              <h1 className="messageofSuccess">{successMessage}</h1> // Display success message in place of the form
            )}

            <button className="close-button" onClick={togglePopup}>
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteForm;
