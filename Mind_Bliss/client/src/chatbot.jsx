import React, { useState,useEffect } from 'react';
import './chatbot.css';  // (optional styling file)

function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showMain, setShowMain] = useState(false);
  const [moveUp, setMoveUp] = useState(false);

  
  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    // Add user's message to chat history
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
  
  useEffect(() => {
      // 1. Show "MindBliss"
      setShowMain(true);
  
      // 2. After 1.5s, move it up
      const moveTimer = setTimeout(() => {
        setMoveUp(true);
      }, 500);

      return () => {
      clearTimeout(moveTimer);
    };
  }, []);
  return (
    <div className="chatbot-container">
      <h1
          className={`main-heading 
            ${showMain ? 'fade-in' : ''} 
            ${moveUp ? 'move-up' : ''}`}
        >
          MindBliss
        </h1>
      <h2>AI Chatbot 💬</h2>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === 'user' ? 'You:' : 'MindBliss AI:'}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Chat with MindBliss AI"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
