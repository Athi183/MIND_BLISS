import { useEffect, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import ProfilePopup from './ProfilePopup';
const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(() => localStorage.getItem('muted') === 'true');

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
        .catch((e) => console.warn('Autoplay blocked:', e.message));
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
    <div className="fixed top-4 right-4 flex items-center gap-3 z-50">
      <button
        onClick={toggleMute}
        className="bg-white/70 backdrop-blur p-3 rounded-full shadow-md hover:scale-110 transition"
        title="Audio"
      >
        {muted ? (
          <FaVolumeMute className="text-[#A63D28]" size={22} />
        ) : (
          <FaVolumeUp className="text-[#A63D28]" size={22} />
        )}
      </button>
      <ProfilePopup user={{ name: 'Ammu', email: 'ammu@example.com', streak: '5 days🔥' }} />

    </div>
  </>
);

};

export default MusicPlayer;
