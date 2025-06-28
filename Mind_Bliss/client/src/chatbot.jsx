import React, { useState, useEffect } from 'react';
import './chatbot.css';
import Lottie from 'lottie-react';
import PetalAnimation from './PetalAnimation.jsx';

function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showMain, setShowMain] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setShowMain(true);

    fetch('/assets/Melo.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load Melo.json:', err));

    const timer = setTimeout(() => setVisible(true), 1000);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, no response from AI.' }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Server error. Please try again.' }]);
    }

    setUserMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-container">
      <PetalAnimation />

      {/* Heading with Lottie animation */}
      <h1 className={`main-heading1 ${showMain ? 'fade-in' : ''}`}>
        Wanna chat with Melo?{' '}
        {animationData && visible && (
          <div className="melo-lottie-inline">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )}
      </h1>

      <h2>Share your worries, thoughts or anything... I'm here as your companion 💬✨</h2>

      {/* Intro GIF - Only show when chat is empty */}
      {messages.length === 0 && (
        <div className="melo-intro-gif">
          <img src="/assets/melo-intro.gif" alt="Melo Intro" />
        </div>
      )}

      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>
                <strong>{msg.sender === 'user' ? 'You: ' : 'Melo 🌸: '}</strong>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Input Section */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Chat with Melo"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage} className="melo-send-button">
          Bloom 🌸
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
