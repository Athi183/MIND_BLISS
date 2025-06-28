import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [showMain, setShowMain] = useState(false);
  const [moveUp, setMoveUp] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    // 1. Show "MindBliss"
    setShowMain(true);

    // 2. After 1.5s, move it up
    const moveTimer = setTimeout(() => {
      setMoveUp(true);
    }, 500);

    // 3. After another 1s, show subtext
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
    <div className="welcome-wrapper">
      <div className="welcome-card">
        <h1
          className={`main-heading 
            ${showMain ? 'fade-in' : ''} 
            ${moveUp ? 'move-up' : ''}`}
        >
          MindBliss
        </h1>

        {showSubtext && (
          <div className={`subtext ${showSubtext ? 'fade-in-delayed' : ''}`}>
            <h2 className="welcome-heading">Welcome to MindBliss🌿</h2>
            <p className="quote">Your journey to self-care and mindfulness starts here!.</p>
            <button className="auth-button" onClick={() => navigate('/login')}>Login / Signup</button>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;