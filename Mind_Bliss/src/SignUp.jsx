import React, { useEffect, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.body.classList.add('signup-page');
    return () => {
      document.body.classList.remove('signup-page');
    };
  }, []);

  const signupUser = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    alert('Signup Successful!');
    // Later: Send user data to your backend here
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
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="signup-input"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field */}
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className="signup-input"
              placeholder="Create New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-icon" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="signup-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="toggle-icon" onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? '👁️' : '🙈'}
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
