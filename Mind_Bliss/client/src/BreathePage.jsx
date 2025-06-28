import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import './BreathePage.css';
import MusicPlayer from './musicplayer';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const BreathePage = () => {
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showMessage, setShowMessage] = useState(false);


  useEffect(() => {
    fetch('/assets/bubble.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load bubble.json:', err));
  }, []);
  const handleStart = () => {
    setStarted(true);
    setShowMessage(false);
    let counter = 3;
    setCountdown(counter);

    const interval = setInterval(() => {
      counter--;
      if (counter === 0) {
        clearInterval(interval);
        setCountdown(null);
        setShowAnimation(true);

        // Show message after 10s of animation
        setTimeout(() => {
          setShowAnimation(false);
          setShowMessage(true);
          setStarted(false); // Re-enable start again
        }, 24000);
      } else {
        setCountdown(counter);
      }
    }, 1000);
  };

  return (
    <div className="breathe-page-wrapper">
      <Header />
      <div className="arrow-wrapper">
  <span className="back-arrow" onClick={() => navigate('/homepage')}>&larr;</span>
</div>
      <MusicPlayer />

      <div className="bubble-animation-section">
        {/* Countdown */}
        {countdown !== null && <p className="countdown">{countdown}</p>}
        
        {/* Breathing animation */}
        {showAnimation && animationData && (
          <Lottie animationData={animationData} loop={true} className="bubble-animation" />
        )}
        
         {/* Instruction under animation */}
        {showAnimation && (
          <p className="instruction">Inhale peace, exhale stress. ❤️</p>
        )}
        {/* Stop button during animation */}
        {showAnimation && (
          <button
            className="stop-breathing-btn"
            onClick={() => {
              setShowAnimation(false);
              setShowMessage(true);
              setStarted(false);
              setCountdown(null);
            }}
          >
            Stop
          </button>
        )}
        {/* Motivational message after animation */}
        {showMessage && (
          <div className="completion-message">
            <p>Well done 💛</p>
            <p>You gave yourself a moment of calm ✨</p>
          </div>
        )}

        {!started && !showAnimation && (
          <button className="start-breathing-btn" onClick={handleStart}>
            {showMessage ? "Start Again" : "Start Breathing 🌬️"}
          </button>
        )}
      </div>
    </div>
  );
}; 


export default BreathePage;
