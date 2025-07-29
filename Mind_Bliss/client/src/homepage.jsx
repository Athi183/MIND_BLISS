import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BreathePop from './breathe';
import MeloPopup from './melopop';



function Homepage() {
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

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start text-center px-4 pt-20 pb-32  font-[Quicksand] overflow-auto">
      <h1 className="text-white text-4xl sm:text-5xl mb-4 animate-fadeSlideUp font-bold">
        Hi There! ✨
      </h1>
      
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-4 sm:p-6 max-w-md min-h-[240px] text-[#000] mt-4 animate-fadeSlideUp">
        <h2 className="text-2xl font-extrabold text-[#A63D28] mb-6">Quote of the Day</h2>
        <p className="text-lg sm:text-xl italic mb-2">“{quote}”</p>
        <p className="text-sm sm:text-base font-medium">— {author}</p>
      </div>

      <button
        onClick={() => navigate('/journal')}
        className="bg-[#ee9d2c] text-white font-bold text-xl sm:text-2xl mt-8 px-8 py-3 rounded-full shadow-inner transition-all duration-300 hover:bg-[#f8e479] hover:text-[#5a2013]"
      >
        Let your thoughts flow🌼
      </button>

      {/* Side-by-side popups below the button */}
      <div className="mt-10 w-full max-w-5xl flex justify-between items-start px-4 sm:px-12">
        <BreathePop />
        <MeloPopup />
      </div>
    </div>
  );
}

export default Homepage;
