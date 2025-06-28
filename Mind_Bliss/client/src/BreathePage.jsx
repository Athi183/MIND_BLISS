// src/BreathePage.jsx
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import './BreathePage.css';
import MusicPlayer from './musicplayer';
import Header from './Header';

const BreathePage = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/assets/bubble.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load bubble.json:', err));
  }, []);

  return (
    <div className="breathe-page-wrapper">
      <Header />
      <MusicPlayer />
      <div className="bubble-animation-section">
        {animationData && (
          <Lottie animationData={animationData} loop={true} className="bubble-animation" />
        )}
        <p className="instruction">Breathe in... Hold... Breathe out... Repeat 🌬️</p>
        
      </div>
    </div>
  );
};

export default BreathePage;
