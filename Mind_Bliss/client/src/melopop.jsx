import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

const MeloPopup = () => {
  const [animationData, setAnimationData] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/assets/Melo.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load Melo.json:', err));

    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!animationData) return null;

  return (
    <div
      className={`flex flex-col items-center text-center z-10 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } cursor-pointer`}
      onClick={() => navigate('/chatbot')}
    >
      <div>
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-32 h-32 sm:w-48 sm:h-48"
        />
      </div>
      <div className="bg-[#fff8dc] text-[#333] px-3 sm:px-4 py-2 rounded-full shadow hover:bg-[#f8e479] hover:text-black transition hover:scale-105 text-xs sm:text-sm">
        Hey! Melo here... Wanna chat? 🐾
      </div>
    </div>
  );
};

export default MeloPopup;
