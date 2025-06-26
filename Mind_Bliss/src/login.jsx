import React, { useState } from 'react';
import { useRef } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (email.trim() === '') {
      emailRef.current.classList.add('shake');
      hasError = true;
    }

    if (password.trim() === '') {
      passwordRef.current.classList.add('shake');
      hasError = true;
    }

    if (!hasError) {
      console.log('Form submitted');
    }

    // Remove shake effect after animation
    setTimeout(() => {
      emailRef.current?.classList.remove('shake');
      passwordRef.current?.classList.remove('shake');
    }, 500);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Start your day with gratitude</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="password-container">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            <span className="toggle-icon fake-icon-space" />
          </div>
        {/* Password Field */}
          <div className="password-container">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <span className="toggle-icon" onClick={togglePassword}>
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>
          

          <button type="submit" className="login-button">Log In</button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to="/signup" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
