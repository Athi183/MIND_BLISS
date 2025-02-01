import { useState } from "react";
import './Login.css'; // Custom Login styles in Login.css

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="text-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Logo"
            className="logo"
          />
          <h2 className="login-heading">
            Log in to Your Account
          </h2>
          <p className="login-description">
            Please enter your credentials to continue
          </p>
        </div>

        <form>
          {/* Email input */}
          <div className="input-container">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Password input */}
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="submit-button"
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="sign-up-container">
          <p className="sign-up-text">
            Don't have an account?{" "}
            <a
              href="#"
              className="sign-up-link"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;