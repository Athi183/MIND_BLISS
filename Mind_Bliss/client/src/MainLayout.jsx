// MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import MusicPlayer from './musicplayer';

const MainLayout = () => {
  return (
    <>
      <Header />
      <MusicPlayer />
      <div className="main-body-content">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
