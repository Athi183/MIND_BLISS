import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './login.jsx'
import Signup from './SignUp.jsx'
import HomePage from './homepage.jsx';
import Chatbot from './chatbot.jsx';
import BreathePage from './BreathePage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/SignUp" element={<Signup />} />
    <Route path="/homepage" element={<HomePage />} />
    <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/breathe" element={<BreathePage />} />
  </Routes>
</BrowserRouter>
  </StrictMode>,
)
