// main.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Login from './login.jsx'
import Signup from './SignUp.jsx'
import HomePage from './homepage.jsx'
import Chatbot from './chatbot.jsx'
import BreathePage from './BreathePage.jsx'
import MainLayout from './MainLayout.jsx' //  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* All post-login routes wrapped with header + music */}
        <Route element={<MainLayout />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/breathe" element={<BreathePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
