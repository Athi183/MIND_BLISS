import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.css'; // Keep this for Google Fonts & Tailwind

function App() {
  const [showMain, setShowMain] = useState(false);
  const [moveUp, setMoveUp] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    setShowMain(true);

    const moveTimer = setTimeout(() => {
      setMoveUp(true);
    }, 500);

    const subtextTimer = setTimeout(() => {
      setShowSubtext(true);
    }, 1500);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(subtextTimer);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* ✅ Background Video */}
      <video
        autoPlay
        muted
        loop
        id="background-video"
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/assets/mindbliss-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ✅ Main App Content */}
      <div className="relative z-10 h-full w-full flex justify-center items-center font-[Quicksand] px-4">
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-xl h-[340px] p-6 relative overflow-hidden text-center">
          <h1
            className={`text-white font-[Caveat] font-extrabold absolute left-1/2 transition-all duration-1000 
              ${showMain ? 'opacity-100' : 'opacity-0'} 
              ${moveUp ? 'top-6 text-5xl -translate-x-1/2' : 'top-1/2 text-[80px] -translate-x-1/2 -translate-y-1/2'}
            `}
          >
            MindBliss
            <span className="block h-1 w-24 bg-[#F8E479] rounded-full mt-2 mx-auto"></span>
          </h1>

          {showSubtext && (
            <div
              className={`transition-all duration-1000 
                ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                mt-[140px]
              `}
            >
              <h2 className="text-[#A63D28] text-xl sm:text-2xl font-semibold">Welcome to MindBliss 🌿</h2>
              <p className="text-sm sm:text-base text-gray-800 mt-2">
                Your journey to self-care and mindfulness starts here!
              </p>
              <button
                onClick={() => navigate('/login')}
                className="mt-3 px-6 py-2 bg-[#F8E479] text-gray-900 font-semibold rounded-full shadow-md hover:bg-[#e58e1a] hover:text-white transition-transform hover:-translate-y-1"
              >
                Login / Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
