import { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

function ProfilePopup({ user }) {
  const [showPopup, setShowPopup] = useState(false);
  const [dp, setDp] = useState('');
  const [showFullDp, setShowFullDp] = useState(false);

  const defaultDp = "https://i.pinimg.com/originals/3f/72/b7/3f72b70d77dbfa2452417814b6e70907.png";

  useEffect(() => {
    const savedDp = localStorage.getItem("userDp");
    if (savedDp) {
      setDp(savedDp);
    } else {
      setDp(defaultDp);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setDp(reader.result);
      localStorage.setItem("userDp", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="absolute top-4 right-45 z-20">
        <button
  onClick={() => setShowPopup(!showPopup)}
  className="bg-black/30 backdrop-blur-md p-3 sm:p-4 rounded-full shadow-md hover:bg-white/50 transition"
  title="Profile"
>
  <FiUser size={20} className="text-white" />
</button>


        {showPopup && (
          <div className="mt-2 p-4 bg-white/90 shadow-xl rounded-xl text-left text-black w-64 animate-fadeSlideUp">
            <div className="flex items-center gap-3 mb-4">
              {/* Profile picture thumbnail */}
              <img
                src={dp}
                alt="DP"
                onClick={() => setShowFullDp(true)}
                className="w-12 h-12 rounded-full border border-[#ffbb55] shadow-sm cursor-pointer object-cover"
                title="Click to view full DP"
              />
              <div>
                <h3 className="text-lg font-semibold text-[#5a2013]">{user?.name || 'Guest'}</h3>
                <p className="text-sm text-gray-600">{user?.email || 'Not signed in'}</p>
              </div>
            </div>
            <div className="text-sm mb-2">
              <p><strong>Journal Streak:</strong> {user?.streak || '0 days'}</p>
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
      {showFullDp && (
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
