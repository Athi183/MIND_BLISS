import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import PetalAnimation from './PetalAnimation';
import { useNavigate } from 'react-router-dom';

function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showMain, setShowMain] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [visible, setVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setShowMain(true);
    fetch('/assets/Melo.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load Melo.json:', err));
    setVisible(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    <div className="flex flex-col items-center px-4 pt-20 pb-10 min-h-screen relative font-quicksand">
      <PetalAnimation />

      {/* Back Arrow */}
      <div
        onClick={() => navigate('/homepage')}
        className="absolute top-5 left-5 text-2xl text-[#5a2013] hover:text-yellow-300 cursor-pointer transition-transform duration-200 hover:scale-110 z-50"
      >
        &larr;
      </div>

      {/* Header */}
      <div className="w-full max-w-3xl bg-white/20 border border-white/30 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8 text-center">
        <h1 className={`text-2xl md:text-3xl font-bold text-[#5a2013] animate-float-glow ${showMain ? 'opacity-100' : 'opacity-0'}`}>
          Wanna chat with Melo?
        </h1>
        <h2 className="text-lg md:text-xl italic text-[#4e2a2a] mt-2">
          Share your worries, thoughts or anything... I'm here as your companion 💬✨
        </h2>

        {animationData && visible && messages.length === 0 && (
          <div className="w-60 h-60 mx-auto mt-4">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )}
      </div>

      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="w-full max-w-3xl mt-6 bg-white/30 backdrop-blur-lg rounded-xl p-4 overflow-y-auto max-h-[450px] shadow-inner space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`w-fit max-w-[80%] text-sm sm:text-base px-4 py-3 rounded-2xl shadow ${
                msg.sender === 'user'
                  ? 'ml-auto bg-gradient-to-r from-yellow-200 to-yellow-300 text-black'
                  : 'mr-auto bg-gradient-to-r from-pink-200 to-pink-300 text-[#4e2a2a]'
              }`}
            >
              <strong className="block text-xs text-pink-500 mb-1">
                {msg.sender === 'user' ? 'You:' : 'Melo 🍃:'}
              </strong>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Section */}
      <div className="w-full max-w-3xl mt-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Chat with Melo"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 rounded-xl px-4 py-3 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow text-black placeholder:text-gray-400"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-xl hover:scale-105 transition-transform"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
