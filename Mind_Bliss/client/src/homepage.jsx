import { useEffect, useState } from 'react';
import MeloPopup from './melopop';
import BreathePop from './breathe'; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/assets/quotes.json')
      .then(res => res.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex].quote);
        setAuthor(data[randomIndex].author);
      })
      .catch(err => {
        console.error('Failed to load quote:', err);
        setQuote("Stay positive, you're doing great!");
        setAuthor("MindBliss");
      });
  }, []);

  const handleStartJournal = () => {
    navigate("/journal");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative text-center">
      
      {/* Title Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white animate-fade-slide mb-4">
        Hi There! 🌞
      </h1>

      {/* Quote Box */}
      <div className="flex flex-col justify-center items-center text-center bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-orange-800 mb-6 drop-shadow-md">
          Quote of the Day
        </h2>
        <p className="text-base md:text-lg text-black mb-2 leading-relaxed break-words">
          “{quote}”
        </p>
        <p className="text-sm md:text-base text-black italic">
          — {author}
        </p>
      </div>

      {/* Journal Start Button */}
      <button
        onClick={handleStartJournal}
        className="mt-8 text-xl md:text-2xl font-bold text-white bg-orange-500 hover:bg-yellow-400 hover:text-orange-900 px-8 py-3 rounded-full shadow-inner transition duration-300 ease-in-out"
      >
        Let your thoughts flow 🌼
      </button>

      {/* Popups */}
      <BreathePop />
      <MeloPopup />
    </div>
  );
};

export default Home;
