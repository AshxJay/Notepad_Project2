import { useState, useEffect } from 'react';
import './index.css';

const Notepad = () => {
  const [text, setText] = useState('');
  const [isSaved, setIsSaved] = useState(true);  
  const [notes, setNotes] = useState([]); 
  const [currentNote, setCurrentNote] = useState(null); 
  const [editingNoteName, setEditingNoteName] = useState(null); 
  const [newName, setNewName] = useState(''); 
  const handleChange = (e) => {
    setText(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    if (currentNote !== null) {
      const updatedNotes = [...notes];
      updatedNotes[currentNote] = { text, name: updatedNotes[currentNote].name, id: currentNote };
      setNotes(updatedNotes);
    } else {
      const newNote = { text, name: 'New Note', id: notes.length }; 
      setNotes([...notes, newNote]);
      setCurrentNote(notes.length); 
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    setIsSaved(true); 
  };

  const handleNoteClick = (index) => {
    setCurrentNote(index);
    setText(notes[index].text);
    setIsSaved(true); 
  };

  const handleAddNote = () => {
    setText(''); 
    setCurrentNote(null); 
  };

  const handleNoteNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNoteName = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].name = newName;
    setNotes(updatedNotes);
    setEditingNoteName(null); 
    setIsSaved(false); 
  };

  const toggleEditNoteName = (index) => {
    setEditingNoteName(index);
    setNewName(notes[index].name); 
  };

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  return (
    <div className="notepad-container">
      <div className="sidebar">
        <button onClick={handleAddNote} className="add-note-button">Add Note</button>
        <div className="note-list">
          {notes.map((note, index) => (
            <div key={note.id} className="note-item">
              {editingNoteName === index ? (
                <div className="note-name-edit">
                  <input
                    type="text"
                    value={newName}
                    onChange={handleNoteNameChange}
                    onBlur={() => handleChangeNoteName(index)}
                    autoFocus
                    className="note-name-input"
                  />
                </div>
              ) : (
                <div className="note-item-clickable" onClick={() => handleNoteClick(index)}>
                  <span>{note.name}</span>
                  <button
                    className="edit-name-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEditNoteName(index);
                    }}
                  >
                    ✎
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="notepad-main">
        <textarea
          className="notepad"
          value={text}
          onChange={handleChange}
          placeholder="Start typing..."
        />
        <div className="save-status">
          {isSaved ? <span>Saved</span> : <span>Unsaved</span>}
        </div>
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
};

export default Notepad;
