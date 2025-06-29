import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import Login from './login.jsx';
import Signup from './SignUp.jsx';
import HomePage from './homepage.jsx';
import Chatbot from './chatbot.jsx';
import BreathePage from './BreathePage.jsx';
import Journal from './journal.jsx';
import MainLayout from './MainLayout.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 🔸 App.jsx gets only video bg */}
        <Route path="/" element={<App />} />

        {/* 🔸 All other pages wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/breathe" element={<BreathePage />} />
          <Route path="/journal" element={<Journal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
