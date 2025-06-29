import Lottie from 'lottie-react';
import './BreathePage.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';

const BreathePage = () => {
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const rootRef = useRef(null);

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

        setTimeout(() => {
          setShowAnimation(false);
          setShowMessage(true);
          setStarted(false);
        }, 24000);
      } else {
        setCountdown(counter);
      }
    }, 1000);
  };

  return (
    <div className="breathe-page-root">
    <div className="breathe-page-wrapper">
      <div className="arrow-wrapper">
        <span className="back-arrow" onClick={() => navigate('/homepage')}>&larr;</span>
      </div>

      <div className="bubble-animation-section">
        {/* Countdown */}
        {countdown !== null && <p className="countdown">{countdown}</p>}

        {/* Breathing animation */}
        {showAnimation && animationData && (
          <Lottie animationData={animationData} loop className="bubble-animation" />
        )}

        {/* Instruction */}
        {showAnimation && (
          <p className="instruction">Inhale peace, exhale stress. ❤️</p>
        )}

        {/* Stop button */}
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

        {/* Message after animation */}
        {showMessage && (
          <div className="completion-message">
            <p>Well done 💛</p>
            <p>You gave yourself a moment of calm ✨</p>
          </div>
        )}

        {/* Intro and Start Button */}
        {!started && !showAnimation && !showMessage && (
          <>
            <div className="breathing-intro">
              <h2> Bubble Breathing</h2>
              <p>
                This is a calming exercise that helps reduce stress and anxiety.
                As the bubble grows, inhale deeply… and as it shrinks, exhale slowly.
                Let’s breathe together and bring peace to your mind..☺️
              </p>
            </div>
            <button className="start-breathing-btn" onClick={handleStart}>
              Try out
            </button>
          </>
        )}

        {/* If animation is done, show "Start Again" */}
        {!started && !showAnimation && showMessage && (
          <button className="start-breathing-btn" onClick={handleStart}>
            Start Again
          </button>
        )}
      </div>
    </div></div>
  );
};

export default BreathePage;
