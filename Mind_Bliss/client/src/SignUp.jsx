import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth, provider } from './firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const signupUser = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all fields.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!passwordPattern.test(password)) {
      alert('Password must include uppercase, lowercase, number, and special character.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date()
      });

      alert('Sign up successful!');
      navigate('/homepage');
    } catch (err) {
      console.error('Error during sign up:', err.message);
      alert('Failed to sign up. Try again.');
    }
  };

  const googleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: new Date()
      });

      alert('Signed up with Google successfully!');
      navigate('/homepage');
    } catch (err) {
      console.error('Google sign-in error:', err.message);
      alert('Google Sign Up Failed!');
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
            className="p-3 text-base rounded-lg bg-gray-200 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            className="p-3 text-base rounded-lg bg-gray-200 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create New Password"
              className="p-3 text-base rounded-lg bg-gray-200 text-black w-full pr-10"
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
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="p-3 text-base rounded-lg bg-gray-200 text-black w-full pr-10"
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

          <button
            onClick={signupUser}
            className="p-3 font-bold rounded-lg bg-yellow-300 text-white hover:bg-yellow-400 transition"
          >
            Sign Up
          </button>

          <button
            onClick={googleSignup}
            className="p-3 font-bold rounded-lg bg-yellow-300 text-white hover:bg-yellow-400 transition flex items-center justify-center gap-2"
          >
            <img src="assets/google-logo.png" alt="Google Logo" className="w-5 h-5" />
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
