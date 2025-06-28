// src/MeloPopup.jsx
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import './melopop.css';
import { useNavigate } from 'react-router-dom';

const MeloPopup = () => {
  const [animationData, setAnimationData] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();  // ✅ Initialize navigation

  useEffect(() => {
    // Fetch the Lottie animation JSON
    fetch('/assets/Melo.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load Melo.json:', err));

    // Show popup after 2 seconds
    const timer = setTimeout(() => setVisible(true), 1000);

    return () => clearTimeout(timer);
  }, []);
  const handleClick = () => {
    navigate('/chatbot');  // ✅ Route to Chatbot page
  };

  if (!animationData) return null;

  return (
    <div className={`melo-popup ${visible ? 'show' : ''}`} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Lottie 
      animationData={animationData} 
      loop={true}
      className="melo-animation"
    />
      <div className="melo-text">Hey! Melo here... Wanna chat? 🐾</div>
    </div>
  );
};

export default MeloPopup;
