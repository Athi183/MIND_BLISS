import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import './breathe.css';

const BreathePop = () => {
  const [animationData, setAnimationData] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Load the Lottie animation from public folder
    fetch('/assets/breathe.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load breathe.json:', err));

    // Show popup after 1 second
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!animationData) return null;

  return (
    <div className={`breathe-popup ${visible ? 'show' : ''}`}>
      <Lottie
        animationData={animationData}
        loop={true}
        className="breathe-animation"
      />
      <div className="breathe-text">Feeling a little off? Let’s breathe together 💛</div>
    </div>
  );
};

export default BreathePop;
