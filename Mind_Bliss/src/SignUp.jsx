import React, { useEffect, useState } from 'react';
import './SignUp.css';


function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
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

  return (
    
    <div className="signup-wrapper">
      
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join Mind Bliss for your mindfulness journey!</p>
        
        <div className="signup-form">
          <input
            type="text"
            className="signup-input"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="signup-input"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="signup-button" onClick={signupUser}>
            Sign Up
          </button>
        </div>

        <p className="signup-footer">
          Already have an account? <a className="login-link" href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
