import { useState, useEffect } from 'react';
import './index.css';

const Notepad = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
    // Here you would add your real-time sync logic
  };

  return (
    <div className="notepad-container">
      <textarea
        className="notepad"
        value={text}
        onChange={handleChange}
        placeholder="Start typing..."
      />
    </div>
  );
};

export default Notepad;