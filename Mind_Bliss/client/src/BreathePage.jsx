import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

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
    <div
      ref={rootRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('/assets/your-background-image.jpg')",
      }}
    >
      {/*  Back Arrow */}
      <button
        onClick={() => navigate('/homepage')}
        className="absolute top-5 left-5 text-3xl text-[#5a2013] hover:text-yellow-300 cursor-pointer transition-transform duration-200 hover:scale-110 bg-transparent border-none focus:outline-none"
        style={{ zIndex: 9999 }}
      >
        &larr;
      </button>

      {/* Countdown */}
      {countdown !== null && (
        <p className="text-6xl md:text-7xl font-bold text-black mb-6 animate-pulse">
          {countdown}
        </p>
      )}

      {/*  Bubble Animation */}
      {showAnimation && animationData && (
        <>
          <div className="w-64 h-64 md:w-96 md:h-96 mx-auto pointer-events-none">
            <Lottie animationData={animationData} loop />
          </div>
          <p className="text-lg md:text-xl font-medium text-[#fff] mt-4">
            Inhale peace, exhale stress ❤️
          </p>
          <button
            className="mt-4 px-5 py-2 text-sm md:text-base rounded-full bg-[#A63D28] text-white hover:bg-[#8c2f1c] transition duration-300"
            onClick={() => {
              setShowAnimation(false);
              setShowMessage(true);
              setStarted(false);
              setCountdown(null);
            }}
          >
            Stop
          </button>
        </>
      )}

      {/* ✅ Completion Message */}
      {showMessage && (
        <div className="text-[#5a2013] mt-6 text-2xl md:text-3xl font-semibold text-center">
          <p>Well done 💛</p>
          <p>You gave yourself a moment of calm ✨</p>
        </div>
      )}

      {/* ✅ Breathing Intro */}
      {!started && !showAnimation && !showMessage && (
        <>
          <div className="max-w-md bg-yellow-50/70 backdrop-blur-sm text-[#5a2013] rounded-lg shadow-md p-4 text-base md:text-lg">
            <h2 className="text-xl md:text-2xl font-bold text-[#A63D28] mb-2 font-mono">
              Bubble Breathing
            </h2>
            <p>
              This is a calming exercise to reduce stress and anxiety. As the bubble grows, inhale deeply… as it shrinks, exhale slowly. Let’s breathe together and bring peace to your mind… ☺️
            </p>
          </div>
          <button
            onClick={handleStart}
            className="mt-6 px-6 py-3 text-lg md:text-xl rounded-full bg-yellow-300 text-[#333] font-semibold shadow-md hover:bg-yellow-200 transition-transform duration-300 hover:scale-105"
          >
            Try out
          </button>
        </>
      )}

      {/* ✅ Start Again */}
      {!started && !showAnimation && showMessage && (
        <button
          onClick={handleStart}
          className="mt-6 px-6 py-3 text-lg md:text-xl rounded-full bg-yellow-300 text-[#333] font-semibold shadow-md hover:bg-yellow-200 transition-transform duration-300 hover:scale-105"
        >
          Start Again
        </button>
      )}
    </div>
  );
};

export default BreathePage;