// src/components/ProcessingModal.jsx
import React, { useState } from 'react';
import './ProcessingModal.css';

const ProcessingModal = ({ show, onClose, onSubmit }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = () => {
    onSubmit(topic);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Enter a topic to generate flashcards</h3>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="topic-input"
        />
        <button onClick={handleSubmit} className="btn submit-btn">Generate</button>
        <button onClick={onClose} className="btn close-btn">Cancel</button>
      </div>
    </div>
  );
};

export default ProcessingModal;
