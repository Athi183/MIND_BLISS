import { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

function ProfilePopup({ user }) {
  const [showPopup, setShowPopup] = useState(false);
  const [dp, setDp] = useState('');
  const [showFullDp, setShowFullDp] = useState(false);

  useEffect(() => {
    const savedDp = localStorage.getItem('userDp');
    if (savedDp) {
      setDp(savedDp);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setDp(reader.result);
      localStorage.setItem('userDp', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const getInitial = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <div>
        <button
          onClick={() => setShowPopup(!showPopup)}
          className="bg-white/70 backdrop-blur p-3 rounded-full shadow-md hover:scale-110 transition"
          title="Profile"
        >
          <FiUser size={22} className="text-[#A63D28]" />
        </button>

        {showPopup && (
          <div className="mt-2 p-4 bg-white/90 shadow-xl rounded-xl text-left text-black w-64 animate-fadeSlideUp absolute right-0 z-50">
            <div className="flex items-center gap-3 mb-4">
              {/* Profile picture or initial */}
              {dp ? (
                <img
                  src={dp}
                  alt="DP"
                  onClick={() => setShowFullDp(true)}
                  className="w-12 h-12 rounded-full border border-[#ffbb55] shadow-sm cursor-pointer object-cover"
                  title="Click to view full DP"
                />
              ) : (
                <div
                  onClick={() => setShowFullDp(true)}
                  className="w-12 h-12 rounded-full border border-[#ffbb55] shadow-sm cursor-pointer bg-orange-200 text-orange-800 font-bold flex items-center justify-center text-lg"
                  title="Click to view full DP"
                >
                  {getInitial(user?.name)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-[#5a2013]">
                  {user?.name || 'Guest'}
                </h3>
                <p className="text-sm text-gray-600">
                  {user?.email || 'Not signed in'}
                </p>
              </div>
            </div>

            <div className="text-sm mb-2">
              <p>
                <strong>Journal Streak:</strong> {user?.streak || '0 days'}
              </p>
            </div>

            <div className="mt-2">
              <label
                htmlFor="dpInput"
                className="text-xs text-blue-600 hover:underline cursor-pointer"
              >
                Change Picture
              </label>
              <input
                id="dpInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>

      {/* Full DP View Modal */}
      {showFullDp && dp && (
        <div
          onClick={() => setShowFullDp(false)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[999]"
        >
          <div className="relative">
            <img
              src={dp}
              alt="Full DP"
              className="max-w-[80vw] max-h-[80vh] rounded-2xl border-4 border-white"
            />
            <button
              className="absolute top-[-10px] right-[-10px] bg-white text-black p-2 rounded-full"
              onClick={() => setShowFullDp(false)}
            >
              <IoClose size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePopup;
