import React, { useState, useEffect } from 'react';
import { FiMaximize2, FiX, FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { db } from './firebase/firebaseConfig'; // Adjust path if needed
import { collection, addDoc, query, Timestamp, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const emojiList = ['😊', '😢', '😠', '❤', '👍', '🎉', '✨', '🌿', '💡', '📅', '💖'];

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expanded, setExpanded] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [modalEntry, setModalEntry] = useState(null);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [editingEntryModal, setEditingEntryModal] = useState(null);
  const [editedModalText, setEditedModalText] = useState('');
  const [editedModalTitle, setEditedModalTitle] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const snapshot = await getDocs(collection(db, "journalEntries"));
        const data = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id, // Firebase doc ID
        }));
        setEntries(
          data.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };
    fetchEntries();
  }, []);

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }
    if (!note.trim()) {
      alert('Note cannot be empty.');
      return;
    }
    const newEntry = {
      title,
      text: note,
      date: selectedDate.toISOString(),
      time: new Date().toLocaleTimeString(),
      createdAt: Timestamp.now(),
    };
    try {
      await addDoc(collection(db, "journalEntries"), newEntry);
      const snapshot = await getDocs(collection(db, "journalEntries"));
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEntries(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setNote('');
      setTitle('');
      setFocusedField(null);
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert("Failed to save entry to Firebase.");
    }
  };

  const toggleDeleteSelection = (id, checked) => {
    setSelectedEntries(prev => checked ? [...prev, id] : prev.filter(entryId => entryId !== id));
  };

  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedEntries) {
        await deleteDoc(doc(db, "journalEntries", id));
      }
      const updated = entries.filter(entry => !selectedEntries.includes(entry.id));
      setEntries(updated);
      setSelectedEntries([]);
      setShowCheckboxes(false);
    } catch (error) {
      console.error("Error deleting entries:", error);
      alert("Failed to delete one or more entries.");
    }
  };

  const addEmoji = (emoji) => {
    if (focusedField === 'title') {
      setTitle(prev => prev + emoji);
    } else {
      setNote(prev => prev + emoji);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const entriesByDate = entries.filter(
    entry => new Date(entry.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative">
      <div className="absolute top-4 left-4 z-50">
        <span
          className="text-6xl text-[#5a2013] cursor-pointer hover:scale-125 hover:text-yellow-300 transition"
          onClick={() => navigate('/homepage')}
        >
          &larr;
        </span>
      </div>

      <div className={`relative w-full max-w-xl p-10 flex flex-col items-center 
        ${expanded || modalEntry || editingEntryModal ? "blur-sm pointer-events-none select-none" : ""}`}
      >
        <h2 className="font-pacifico text-center mb-6 text-3xl text-brown-900 drop-shadow-lg">Your Daily Journal</h2>

        <div className="w-full flex items-center mb-4 relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full py-3 px-6 pr-12 rounded-xl border border-orange-200 bg-gradient-to-r from-yellow-100 to-yellow-200 !text-black font-pacifico shadow outline-none focus:ring-2 focus:ring-orange-300 transition"
            dateFormat="PPPP"
          />
          <FiCalendar className="absolute right-4 text-xl text-orange-600 pointer-events-none" />
        </div>

        <input
          type="text"
          className="w-full py-3 px-6 rounded-xl border border-orange-200 mb-4 bg-gradient-to-r from-yellow-100 to-yellow-200 !text-black font-pacifico placeholder-gray-400 shadow outline-none focus:ring-2 focus:ring-orange-300 transition"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setFocusedField('title')}
          required
        />

        <div className="w-full mb-4 relative">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Dear Diary..."
            className="w-full h-32 py-4 px-6 rounded-xl border border-orange-200 shadow bg-gradient-to-br from-yellow-100 to-orange-100 !text-black placeholder-orange-700 font-medium shadow focus:ring-2 focus:ring-orange-300 resize-none transition firefly-animated"
            onFocus={() => setFocusedField('note')}
          />
          <button
            className="absolute bottom-2 right-2 text-lg text-orange-600 hover:text-orange-900 transition"
            onClick={() => setExpanded(true)}
            title="Expand"
            type="button"
          >
            <FiMaximize2 />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-4 justify-center">
          {emojiList.map((emoji, index) => (
            <button
              key={index}
              onClick={() => addEmoji(emoji)}
              className="bg-transparent border-none text-2xl cursor-pointer transition hover:scale-125"
              type="button"
            >
              {emoji}
            </button>
          ))}
        </div>

        <button
          className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-xl shadow transition mb-4"
          onClick={handleSave}
        >
          Save Entry
        </button>

        <div className="w-full mt-2">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-lg font-bold !text-white font-sans">
              Entries for {selectedDate.toDateString()}
            </h2>
            <div className="flex items-center gap-2">
              {entriesByDate.length > 0 && (
                <button
                  className="bg-transparent border-none text-red-500 hover:text-red-700 text-xl transition"
                  title="Toggle delete selection"
                  onClick={() => setShowCheckboxes(prev => !prev)}
                  type="button"
                >
                  <FiTrash2 />
                </button>
              )}
            </div>
          </div>
          {entriesByDate.length === 0 ? (
            <p className="text-black text-base text-left pl-3">No entries yet for this date.</p>
          ) : (
            entriesByDate.map((entry) => (
              <div
                key={entry.id}
                className="bg-white/90 border border-orange-100 shadow rounded-lg p-4 mb-3 flex flex-col"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-base text-orange-900 font-pacifico">{entry.title}</h4>
                  <div className="flex gap-2">
                    <button
                      className="text-orange-700 hover:text-orange-900 p-1"
                      onClick={() => {
                        setEditingEntryModal(entry);
                        setEditedModalText(entry.text);
                        setEditedModalTitle(entry.title);
                      }}
                      title="Edit Entry"
                      type="button"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      className="text-orange-700 hover:text-orange-900 p-1"
                      onClick={() => setModalEntry(entry)}
                      title="Open Entry"
                      type="button"
                    >
                      Open
                    </button>
                  </div>
                </div>
                <span className="text-xs italic text-orange-600 bg-orange-50 px-2 py-1 rounded mb-2 font-mono">
                  📅 {formatDate(entry.date)} | 🕒 {entry.time}
                </span>
                {showCheckboxes &&
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-2 border-orange-400 rounded bg-white checked:bg-orange-400 accent-orange-400 transition"
                      onChange={(e) => toggleDeleteSelection(entry.id, e.target.checked)}
                      checked={selectedEntries.includes(entry.id)}
                    />
                  </div>
                }
              </div>
            ))
          )}

          {selectedEntries.length > 0 && (
            <div className="flex justify-center gap-12 mt-4 mb-4">
              <button
                className="flex items-center gap-2 bg-red-600 text-white rounded-lg px-6 py-2 font-bold hover:bg-red-700 transition"
                onClick={handleDeleteSelected}
                type="button"
              >
                <FiTrash2 /> Delete Selected
              </button>
              <button
                className="bg-gray-400 text-white rounded-lg px-6 py-2 font-bold hover:bg-gray-700 transition"
                onClick={() => {
                  setSelectedEntries([]);
                  setShowCheckboxes(false);
                }}
                type="button"
              >
                ❌ Cancel Deletion
              </button>
            </div>
          )}
        </div>
      </div>

      {expanded && (
        <div className="fixed inset-0 bg-black/40 z-30 flex items-center justify-center">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-xl w-full relative border border-orange-200">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Dear Diary..."
              className="w-full h-60 py-4 px-6 rounded-xl border border-orange-200 bg-gradient-to-br from-yellow-100 to-orange-100 !text-black placeholder-orange-700 font-medium shadow focus:ring-2 focus:ring-orange-300 resize-none transition"
              autoFocus
            />
            <button
              className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700 transition"
              onClick={() => setExpanded(false)}
              title="Close"
              type="button"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}

      {editingEntryModal && !modalEntry && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <div className="bg-orange-200 rounded-2xl shadow-xl p-8 max-w-xl w-full relative text-black border-2 border-orange-300">
            <h3 className="font-pacifico text-xl mb-2 !text-orange-700">{editingEntryModal.title}</h3>
            <p className="text-xs italic text-orange-600 bg-orange-50 px-2 py-1 rounded mb-2 font-mono">
              📅 {formatDate(editingEntryModal.date)} | 🕒 {editingEntryModal.time}
            </p>
            <input
              type="text"
              placeholder="Edit Title"
              value={editedModalTitle}
              onChange={(e) => setEditedModalTitle(e.target.value)}
              className="w-full py-2 px-4 rounded-xl border border-orange-200 mb-4 bg-white text-black font-medium shadow"
            />

            <textarea
              value={editedModalText}
              onChange={(e) => setEditedModalText(e.target.value)}
              className="w-full h-48 py-4 px-6 rounded-xl border border-orange-200 bg-gradient-to-br from-yellow-100 to-orange-100 !text-black placeholder-orange-700 font-medium shadow focus:ring-2 focus:ring-orange-300 resize-none transition"
              autoFocus
            />
            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-6 rounded-xl shadow transition"
                onClick={async () => {
                  try {
                    const entryRef = doc(db, 'journalEntries', editingEntryModal.id);
                    if (!editedModalText.trim() || !editedModalTitle.trim()) {
                      alert("Both title and text are required.");
                      return;
                    }
                    await updateDoc(entryRef, { text: editedModalText, title: editedModalTitle });
                    const updated = entries.map(entry =>
                      entry.id === editingEntryModal.id
                        ? { ...entry, text: editedModalText, title: editedModalTitle }
                        : entry
                    );
                    setEntries(updated);
                    setEditingEntryModal(null);
                    setEditedModalText('');
                    setEditedModalTitle('');
                  } catch (error) {
                    console.error("Error updating entry:", error);
                    alert("Failed to update the entry.");
                  }
                }}
                type="button"
              >
                Update
              </button>
              <button
                className="bg-gray-400 text-white rounded-xl px-6 py-2 font-bold hover:bg-gray-700 transition flex items-center gap-2"
                onClick={() => {
                  setEditingEntryModal(null);
                  setEditedModalText('');
                }}
                type="button"
              >
                <FiX /> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEntry && !editingEntryModal && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <div className="bg-orange-200 rounded-2xl shadow-xl p-8 max-w-xl w-full relative text-black border-2 border-orange-300">
            <h3 className="font-pacifico text-xl mb-2 text-red-500" style={{ color: '#ef4444', fontWeight: 'bold' }}>{modalEntry.title}</h3>
            <p className="text-xs italic text-orange-600 bg-orange-50 px-2 py-1 rounded mb-2 font-mono">
              📅 {formatDate(modalEntry.date)} | 🕒 {modalEntry.time}
            </p>
            <textarea
              value={modalEntry.text}
              readOnly
              className="w-full h-48 py-4 px-6 rounded-xl border border-orange-200 bg-gradient-to-br from-yellow-100 to-orange-100 !text-red-500 placeholder-orange-700 font-medium shadow resize-none"
            />
            <button
              className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700 transition"
              onClick={() => setModalEntry(null)}
              title="Close"
              type="button"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;