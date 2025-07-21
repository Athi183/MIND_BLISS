import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "./firebase/firebaseConfig";// adjust path if needed
import { collection, addDoc } from 'firebase/firestore';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
// Inside SignUpPage component
const signupUser = async () => {
  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill all fields.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  try {
    await addDoc(collection(db, 'users'), {
      name,
      email,
      password, // 🔒 WARNING: storing raw passwords is insecure!
      createdAt: new Date(),
    });

    alert('Sign up successful!');
    navigate('/homepage');
  } catch (err) {
    console.error('Error saving user:', err);
    alert('Failed to sign up. Try again.');
  }
};



  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-8 w-full max-w-md text-center shadow-lg">
        <h2 className="text-4xl font-extrabold text-white mb-2">Create Account</h2>
        <p className="text-sm text-gray-200 mb-6">Join Mind Bliss for your mindfulness journey!</p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="p-3 text-base rounded-lg bg-gray-200 text-black outline-none shadow focus:ring-2 focus:ring-yellow-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            className="p-3 text-base rounded-lg bg-gray-200 text-black outline-none shadow focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create New Password"
              className="p-3 text-base rounded-lg bg-gray-200 text-black outline-none shadow focus:ring-2 focus:ring-yellow-400 w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-3 right-3 cursor-pointer text-gray-600"
            >
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="p-3 text-base rounded-lg bg-gray-200 text-black outline-none shadow focus:ring-2 focus:ring-yellow-400 w-full pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-3 right-3 cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? '👁️' : '🙈'}
            </span>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={signupUser}
            className="p-3 font-bold rounded-lg bg-yellow-300 text-white hover:bg-yellow-400 transition"
          >
            Sign Up
          </button>

          {/* Google Signup Button */}
          <button className="p-3 font-bold rounded-lg bg-yellow-300 text-white hover:bg-yellow-400 transition flex items-center justify-center gap-2">
            <img
              src="assets/google-logo.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Sign Up with Google
          </button>
        </div>

        <p className="text-sm text-white mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 underline hover:text-orange-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
