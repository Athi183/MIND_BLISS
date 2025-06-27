import React, { useRef, useState, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import './musicplayer.css';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => {
        console.log("Autoplay blocked:", e.message);
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop autoPlay>
        <source src="/assets/bgmusic.mp3" type="audio/mpeg" />
      </audio>
      <button className="music-toggle" onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'}>
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </>
  );
};

export default MusicPlayer;
