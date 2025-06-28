// src/Journal.jsx
import React, { useState, useEffect } from 'react';
import './journal.css';
import { FiMaximize2, FiX, FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const emojiList = [
  '😊', '😢', '😠', '❤️', '👍', '🎉', '✨', '🌿', '💡', '📅', '💖'
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

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title. It is mandatory.');
      return;
    }
    if (!note.trim()) {
      alert('Note cannot be empty.');
      return;
    }
    const newEntry = {
      id: Date.now(),
      text: note,
      title: title,
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

  const entriesByDate = entries.filter(entry => new Date(entry.date).toDateString() === selectedDate.toDateString());

  return (
    <>
      <div className={`journal-wrapper ${expanded ? 'blurred' : ''}`}>
        <div className={`journal-card ${expanded ? 'hidden' : ''}`}>
          <h2>Your Daily Journal</h2>

          <div className="date-picker-wrapper">
            <FiCalendar className="calendar-icon-inside" />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="date-picker"
              dateFormat="MMMM d, yyyy"
            />
          </div>

          <input
            type="text"
            className="journal-title"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setFocusedField('title')}
            required
          />

          <div className="textarea-wrapper">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Dear Diary..."
              className="journal-textarea melted-animated"
              onFocus={() => setFocusedField('note')}
            />
            <button className="open-btn expand-icon-btn" onClick={() => setExpanded(true)}>
              <FiMaximize2 size={20} />
            </button>
          </div>

          <div className="emoji-picker">
            {emojiList.map((emoji, index) => (
              <button key={index} onClick={() => addEmoji(emoji)} className="emoji-btn">
                {emoji}
              </button>
            ))}
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Entry
          </button>

          <div className="entry-list">
            <div className="entry-header-with-trash">
              <h3 className="entry-date-heading">Entries for {selectedDate.toDateString()}</h3>
              <div className="top-action-buttons">
                {entriesByDate.length > 10 && showCheckboxes && selectedEntries.length > 0 && (
                  <>
                    <button className="delete-btn-inline" onClick={handleDeleteSelected}>
                      <FiTrash2 /> Delete
                    </button>
                    <button
                      className="cancel-btn-inline"
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
                  className="trash-top-btn"
                  title="Delete entries"
                  onClick={() => setShowCheckboxes(prev => !prev)}
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>

            {entriesByDate.length === 0 ? (
              <p>No entries yet.</p>
            ) : (
              entriesByDate.map((entry) => (
                <div key={entry.id} className="entry-item">
                  <div className="entry-title-row">
                    <h4 className="entry-title">{entry.title}</h4>
                    <div className="entry-actions-horizontal">
                      <button
                        className="icon-only"
                        onClick={() => {
                          setEditingEntryModal(entry);
                          setEditedModalText(entry.text);
                        }}
                        title="Edit Entry"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        className="expand-btn"
                        onClick={() => setModalEntry(entry)}
                        title="Open Entry"
                      >
                        Open
                      </button>
                    </div>
                  </div>

                  <span className="entry-time">🕒 {entry.time}</span>

                  {showCheckboxes && (
                    <div className="entry-actions">
                      <input
                        type="checkbox"
                        className="styled-checkbox"
                        onChange={(e) => toggleDeleteSelection(entry.id, e.target.checked)}
                        checked={selectedEntries.includes(entry.id)}
                      />
                    </div>
                  )}
                </div>
              ))
            )}

            {selectedEntries.length > 0 && (
              <div className="bottom-action-buttons">
                <button className="action-btn delete-btn" onClick={handleDeleteSelected}>
                  <FiTrash2 /> Delete Selected
                </button>
                <button
                  className="action-btn cancel-delete-btn"
                  onClick={() => {
                    setSelectedEntries([]);
                    setShowCheckboxes(false);
                  }}
                >
                  ❌ Cancel Deletion
                </button>
              </div>
            )}
          </div>
        </div>

        {expanded && (
          <div className="expanded-area">
            <div className="expanded-card">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Dear Diary..."
                className="expanded-textarea melted-animated"
                autoFocus
              />
              <button className="close-btn icon-only" onClick={() => setExpanded(false)}>
                <FiX size={20} />
              </button>
            </div>
          </div>
        )}

        {editingEntryModal && (
          <div className="expanded-area">
            <div className="expanded-card">
              <h3 className="entry-title">{editingEntryModal.title}</h3>
              <p className="entry-time">📅 {editingEntryModal.date} | 🕒 {editingEntryModal.time}</p>
              <textarea
                value={editedModalText}
                onChange={(e) => setEditedModalText(e.target.value)}
                className="expanded-textarea melted-animated"
                autoFocus
              />
              <div style={{ position: 'relative', paddingTop: '30px' }}>
                <button
                  className="save-btn"
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
                  className="edit-close-btn"
                  onClick={() => {
                    setEditingEntryModal(null);
                    setEditedModalText('');
                  }}
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {modalEntry && (
          <div className="expanded-area">
            <h3 className="entry-title">{modalEntry.title}</h3>
            <p className="entry-time">📅 {modalEntry.date} | 🕒 {modalEntry.time}</p>
            <textarea
              value={modalEntry.text}
              readOnly
              className="expanded-textarea firefly-animated"
            />
            <button className="close-btn icon-only" onClick={() => setModalEntry(null)}>
              <FiX size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Journal;
