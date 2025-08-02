import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import MusicPlayer from './musicplayer';



const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* 🔸 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/assets/mindbliss-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔸 Optional Global Elements */}
      <Header />
      <MusicPlayer />
        
      {/* 🔸 Main Content */}
      <div className="relative z-10 flex-grow main-body-content">
        {children || <Outlet />}
      </div>

      {/* 🔸 Footer */}
      <footer className="relative z-10 text-center text-sm text-gray-300 py-4 bg-black bg-opacity-50">
        © {new Date().getFullYear()} MindBliss. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
