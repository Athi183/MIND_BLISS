import React, { useEffect, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // ✅ Password toggle state

  useEffect(() => {
    document.body.classList.add('signup-page');
    return () => {
      document.body.classList.remove('signup-page');
    };
  }, []);

  const signupUser = () => {
    if (!username || !password) {
      alert('Please fill all fields.');
      return;
    }
    alert('Signup Successful!');
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join Mind Bliss for your mindfulness journey!</p>

        <div className="signup-form">
          <input
            type="text"
            className="signup-input"
            placeholder="Enter Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className="signup-input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-icon" onClick={togglePassword}>
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>

          <button className="signup-button" onClick={signupUser}>
            Sign Up
          </button>
        </div>

        <p className="signup-footer">
          Already have an account? <Link className="login-link" to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
