import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (email.trim() === '') {
      emailRef.current.classList.add('animate-shake', 'border-red-500');
      hasError = true;
    }

    if (password.trim() === '') {
      passwordRef.current.classList.add('animate-shake', 'border-red-500');
      hasError = true;
    }

    if (!hasError) {
      navigate('/homepage');
    }

    setTimeout(() => {
      emailRef.current?.classList.remove('animate-shake', 'border-red-500');
      passwordRef.current?.classList.remove('animate-shake', 'border-red-500');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
        <p className="text-lg text-black mb-6">Start your day with gratitude</p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-neutral-100 text-black shadow focus:ring-2 focus:ring-yellow-400 outline-none transition duration-200"
            />
          </div>

          {/* Password */}
          <div className="relative flex items-center">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 rounded-lg bg-neutral-100 text-black shadow focus:ring-2 focus:ring-yellow-400 outline-none transition duration-200"
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 cursor-pointer text-xl text-[#5A2013]"
            >
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>

          <button
            type="submit"
            className="p-3 rounded-lg bg-yellow-300 text-black font-bold shadow-md hover:bg-yellow-400 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-white mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-orange-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
