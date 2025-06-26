import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './login.jsx'
import Signup from './SignUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
</BrowserRouter>
  </StrictMode>,
)
