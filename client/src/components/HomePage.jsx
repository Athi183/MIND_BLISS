import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // Ensure to import the CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Welcome to MindBliss</h1>
        <p>Find peace and serenity in every moment.</p>
      </div>
      
      {/* Updated meditation elements with additional floating objects */}
      <div className="meditation-elements">
        <div className="circle"></div>
        <div className="circle-small"></div> {/* Smaller floating circle */}
        <div className="lotus"></div>
        <div className="floating-heart"></div> {/* Floating heart element */}
      </div>
      
      {/* Placeholder link until the login page is pushed */}
      <div className="login-btn-container">
        <Link to="/login" className="login-btn">Login (Coming Soon)</Link>
      </div>
    </div>
  );
};

export default HomePage;
