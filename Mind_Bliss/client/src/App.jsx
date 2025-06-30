import React, { useState, useEffect } from 'react';
import { FiMaximize2, FiX, FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.css'; // Keep this for Google Fonts & Tailwind

const emojiList = [
  '😊', '😢', '😠', '❤', '👍', '🎉', '✨', '🌿', '💡', '📅', '💖'
];

const Journal = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [];
  });

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
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }
    if (!note.trim()) {
      alert('Note cannot be empty.');
      return;
    }
    const newEntry = {
      id: Date.now(),
      text: note,
      title,
      date: selectedDate,
      time: new Date().toLocaleTimeString(),
    };
    setEntries([newEntry, ...entries]);
    setNote('');
    setTitle('');
    setFocusedField(null);
  };

  const toggleDeleteSelection = (id, checked) => {
    setSelectedEntries(prev =>
      checked ? [...prev, id] : prev.filter(entryId => entryId !== id)
    );
  };

  const handleDeleteSelected = () => {
    const updated = entries.filter(entry => !selectedEntries.includes(entry.id));
    setEntries(updated);
    setSelectedEntries([]);
    setShowCheckboxes(false);
  };

  const addEmoji = (emoji) => {
    if (focusedField === 'title') {
      setTitle(prev => prev + emoji);
    } else {
      setNote(prev => prev + emoji);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const entriesByDate = entries.filter(
    entry => new Date(entry.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative">
      {/* Optional: Top-left back arrow */}
      <div className="absolute top-8 left-8 z-20">
        <span
          className="text-3xl text-[#5a2013] cursor-pointer hover:scale-110 hover:text-yellow-200 transition"
          onClick={() => navigate('/homepage')}
        >
          &larr;
        </span>
      </div>
      {/* Centered Card */}
      <div className={`relative w-full max-w-xl rounded-3xl shadow-2xl p-10 flex flex-col items-center
        ${expanded ? "blur-sm pointer-events-none select-none" : ""} 
        `}
      >
        <h2 className="font-pacifico text-center mb-6 text-3xl text-brown-900 drop-shadow-lg">Your Daily Journal</h2>
        {/* Date Picker */}
        <div className="w-full flex items-center mb-4 relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full py-3 px-6 pr-12 rounded-xl border border-orange-200 bg-gradient-to-r from-yellow-100 to-yellow-200 text-brown-900 font-pacifico shadow outline-none focus:ring-2 focus:ring-orange-300 transition"
            dateFormat="MMMM d, yyyy"
          />
          <FiCalendar className="absolute right-4 text-xl text-orange-600 pointer-events-none" />
        </div>

        {/* Title input */}
        <input
          type="text"
          className="w-full py-3 px-6 rounded-xl border border-orange-200 mb-4 bg-gradient-to-r from-yellow-100 to-yellow-200 text-brown-900 font-pacifico placeholder-gray-400 shadow outline-none focus:ring-2 focus:ring-orange-300 transition"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setFocusedField('title')}
          required
        />

        {/* Note textarea wrapper */}
        <div className="w-full mb-4 relative">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Dear Diary..."
            className="w-full h-32 py-4 px-6 rounded-xl border border-orange-200 bg-gradient-to-br from-yellow-100 to-orange-100 text-brown-800 placeholder-orange-700 font-medium shadow focus:ring-2 focus:ring-orange-300 resize-none transition"
            onFocus={() => setFocusedField('note')}
          />
          <button
            className="absolute bottom-2 right-2 text-lg text-orange-600 hover:text-orange-900 transition"
            onClick={() => setExpanded(true)}
            title="Expand"
          >
            <FiMaximize2 />
          </button>
        </div>

        {/* Emoji Picker */}
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

        {/* Save Button */}
        <button
          className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-xl shadow transition mb-4"
          onClick={handleSave}
        >
          Save Entry
        </button>

        {/* Entry List */}
        <div className="w-full mt-2">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-brown-900 font-sans">
              Entries for {selectedDate.toDateString()}
            </h3>
            {/* Trash & delete controls */}
            <div className="flex items-center gap-2">
              {entriesByDate.length > 10 && showCheckboxes && selectedEntries.length > 0 && (
                <>
                  <button
                    className="flex items-center gap-1 bg-red-600 text-white rounded-md px-3 py-1 text-sm hover:bg-red-700 transition"
                    onClick={handleDeleteSelected}
                  >
                    <FiTrash2 /> Delete
                  </button>
                  <button
                    className="bg-gray-400 text-white rounded-md px-3 py-1 text-sm hover:bg-gray-700 transition"
                    onClick={() => {
                      setSelectedEntries([]);
                      setShowCheckboxes(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
              <button
                className="bg-transparent border-none text-red-500 hover:text-red-700 text-xl ml-2 transition"
                title="Delete entries"
                onClick={() => setShowCheckboxes(prev => !prev)}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
          {/* Entries */}
          {entriesByDate.length === 0 ? (
            <p className="text-gray-500 text-base text-left pl-3">No entries yet.</p>
          ) : (
            entriesByDate.map((entry) => (
              <div
                key={entry.id}
                className="bg-white/70 border border-orange-100 shadow rounded-lg p-4 mb-3 flex flex-col"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-base text-orange-900 font-pacifico">{entry.title}</h4>
                  <div className="flex gap-2">
                    <button
                      className="text-orange-700 hover:text-orange-900 p-1"
                      onClick={() => {
                        setEditingEntryModal(entry);
                        setEditedModalText(entry.text);
                      }}
                      title="Edit Entry"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      className="text-orange-700 hover:text-orange-900 p-1"
                      onClick={() => setModalEntry(entry)}
                      title="Open Entry"
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
              >
                <FiTrash2 /> Delete Selected
              </button>
              <button
                className="bg-gray-400 text-white rounded-lg px-6 py-2 font-bold hover:bg-gray-700 transition"
                onClick={() => {
                  setSelectedEntries([]);
                  setShowCheckboxes(false);
                }}
              >
                ❌ Cancel Deletion
  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* ✅ Background Video */}
      <video
        autoPlay
        muted
        loop
        id="background-video"
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/assets/mindbliss-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ✅ Main App Content */}
      <div className="relative z-10 h-full w-full flex justify-center items-center font-[Quicksand] px-4">
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-xl h-[340px] p-6 relative overflow-hidden text-center">
          <h1
            className={`text-white font-[Caveat] font-extrabold absolute left-1/2 transition-all duration-1000 
              ${showMain ? 'opacity-100' : 'opacity-0'} 
              ${moveUp ? 'top-6 text-5xl -translate-x-1/2' : 'top-1/2 text-[80px] -translate-x-1/2 -translate-y-1/2'}
            `}
          >
            MindBliss
            <span className="block h-1 w-24 bg-[#F8E479] rounded-full mt-2 mx-auto"></span>
          </h1>

          {showSubtext && (
            <div
              className={`transition-all duration-1000 
                ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                mt-[140px]
              `}
            >
              <h2 className="text-[#A63D28] text-xl sm:text-2xl font-semibold">Welcome to MindBliss 🌿</h2>
              <p className="text-sm sm:text-base text-gray-800 mt-2">
                Your journey to self-care and mindfulness starts here!
              </p>
              <button
                onClick={() => navigate('/login')}
                className="mt-3 px-6 py-2 bg-[#F8E479] text-gray-900 font-semibold rounded-full shadow-md hover:bg-[#e58e1a] hover:text-white transition-transform hover:-translate-y-1"
              >
                Login / Signup
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Area Modal */}
      {expanded && (
        <div className="fixed inset-0 bg-black/40 z-30 flex items-center justify-center">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-xl w-full relative">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Dear Diary..."
              className="w-full h-60 py-4 px-6 rounded-xl border border-orange-200 bg-gradient-to-br from-yellow-100 to-orange-100 text-brown-800 placeholder-orange-700 font-medium shadow focus:ring-2 focus:ring-orange-300 resize-none transition"
              autoFocus
            />
            <button
              className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700 transition"
              onClick={() => setExpanded(false)}
              title="Close"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}

      {/* Edit Entry Modal */}
      {editingEntryModal && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-xl w-full relative">
            <h3 className="font-pacifico text-xl mb-2">{editingEntryModal.title}</h3>
            <p className="text-xs italic text-orange-600 bg-orange-50 px-2 py-1 rounded mb-2 font-mono">
              📅 {formatDate(editingEntryModal.date)} | 🕒 {editingEntryModal.time}
            </p>
            <textarea
              value={editedModalText}
              onChange={(e) => setEditedModalText(e.target.value)}
              className="w-full h-48 py-4 px-6 rounded-xl border border-orange-200 bg-gradient-to-br from-yellow-100 to-orange-100 text-brown-800 placeholder-orange-700 font-medium shadow focus:ring-2 focus:ring-orange-300 resize-none transition"
              autoFocus
            />
            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-6 rounded-xl shadow transition"
                onClick={() => {
                  const updated = entries.map(entry =>
                    entry.id === editingEntryModal.id
                      ? { ...entry, text: editedModalText }
                      : entry
                  );
                  setEntries(updated);
                  setEditingEntryModal(null);
                  setEditedModalText('');
                }}
              >
                Update
              </button>
              <button
                className="bg-gray-400 text-white rounded-xl px-6 py-2 font-bold hover:bg-gray-700 transition flex items-center gap-2"
                onClick={() => {
                  setEditingEntryModal(null);
                  setEditedModalText('');
                }}
              >
                <FiX /> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Entry Modal */}
      {modalEntry && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-xl w-full relative">
            <h3 className="font-pacifico text-xl mb-2">{modalEntry.title}</h3>
            <p className="text-xs italic text-orange-600 bg-orange-50 px-2 py-1 rounded mb-2 font-mono">
              📅 {formatDate(modalEntry.date)} | 🕒 {modalEntry.time}
            </p>
            <textarea
              value={modalEntry.text}
              readOnly
              className="w-full h-48 py-4 px-6 rounded-xl border border-orange-200 bg-gradient-to-br from-yellow-100 to-orange-100 text-brown-800 placeholder-orange-700 font-medium shadow resize-none"
            />
            <button
              className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700 transition"
              onClick={() => setModalEntry(null)}
              title="Close"
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