import { useEffect, useRef, useState } from 'react';
import './musicplayer.css';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa'; 

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(() => {
    return localStorage.getItem('muted') === 'true';
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = muted;

    if (!muted) {
      audio.volume = 0;
      audio.play()
        .then(() => {
          let volume = 0;
          const fadeInterval = setInterval(() => {
            if (volume < 1) {
              volume += 0.05;
              audio.volume = Math.min(volume, 1);
            } else {
              clearInterval(fadeInterval);
            }
          }, 150);
        })
        .catch((e) => {
          console.warn('Autoplay blocked:', e.message);
        });
    }

    localStorage.setItem('muted', muted);
  }, [muted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !muted;
    setMuted(!muted);
    localStorage.setItem('muted', !muted);
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/bgmusic.mp3" loop autoPlay />
      <button className="music-toggle" onClick={toggleMute}>
        {muted ? <FaVolumeMute color="#A63D28" size={22} /> : <FaVolumeUp color="#A63D28" size={22} />}
      </button>
    </>
  );
};

export default MusicPlayer;
