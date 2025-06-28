import { useEffect, useState } from 'react';
import './homepage.css';
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
    <div className="home-wrapper"> 
      <div className="home-content">
        <h1 className="home-heading">Hi There! 🌞</h1>
        <div className="quote-generator">
          <h2 className="quote-heading">Quote of the Day</h2>
          <p className="daily-quote">“{quote}”</p>
          <p className="author">— {author}</p>
        </div>
        <button className="StartJ" onClick={handleStartJournal}>
          Let your thoughts flow🌼
        </button>
      </div>

      <BreathePop /> 
      <MeloPopup />   
    </div>
  );
};

export default Home;
