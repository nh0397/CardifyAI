// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import './Dashboard.css';
import generateFlashcards from '../services/gemini';
import ProcessingModal from './ProcessingModal';
import TinderCard from 'react-tinder-card';

const colors = [
  { bg: '#FFD700', text: '#000' }, // Gold
  { bg: '#FF6347', text: '#FFF' }, // Tomato
  { bg: '#8A2BE2', text: '#FFF' }, // BlueViolet
  { bg: '#20B2AA', text: '#000' }, // LightSeaGreen
  { bg: '#FF69B4', text: '#FFF' }, // HotPink
  { bg: '#FF4500', text: '#FFF' }, // OrangeRed
  { bg: '#7FFF00', text: '#000' }, // Chartreuse
];

const Dashboard = () => {
  const [flashcardsExist, setFlashcardsExist] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [showSaveOption, setShowSaveOption] = useState(false);
  const [showSkipOption, setShowSkipOption] = useState(false);
  const [savedCards, setSavedCards] = useState([]);

  const handleCreateNewSet = async (topic) => {
    setLoading(true);
    setModalOpen(false);
    try {
      const generatedFlashcards = await generateFlashcards(topic);
      setFlashcards(generatedFlashcards);
      setFlashcardsExist(true);
      setCurrentCardIndex(0); // Reset to the first card
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const swiped = (direction) => {
    if (direction === 'right') {
      setShowSaveOption(true);
      setSavedCards([...savedCards, flashcards[currentCardIndex]]);
    } else if (direction === 'left') {
      setShowSkipOption(true);
    }

    setTimeout(() => {
      setShowSaveOption(false);
      setShowSkipOption(false);
      const nextIndex = currentCardIndex + 1;
      if (nextIndex < flashcards.length) {
        setCurrentCardIndex(nextIndex);
      } else {
        setFeedbackModalOpen(true);
      }
    }, 500);
  };

  const handleFeedback = (feedback) => {
    console.log('User feedback:', feedback);
    setFeedbackModalOpen(false);
    if (feedback === 'yes') {
      console.log('Saving to Firebase...');
      // Use the Firebase logic here to save the `savedCards` array
    }
  };

  return (
    <div className="dashboard">
      <ProcessingModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateNewSet}
      />

      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
          <p>Generating your flashcards...</p>
        </div>
      ) : !flashcardsExist ? (
        <div className="empty-state">
          <h2>It looks like you haven't created any flashcards yet.</h2>
          <p>Click the plus icon to get started with your first set of AI-powered flashcards!</p>
          <FaPlusCircle className="plus-icon" onClick={() => setModalOpen(true)} />
        </div>
      ) : (
        <div className="flashcard-container">
          {flashcardsExist && flashcards.length > 0 && (
            <>
            <div className="flashcard-wrapper">
              <TinderCard key={currentCardIndex} onSwipe={swiped}>
                <div
                  className="flashcard"
                  style={{
                    backgroundColor: colors[currentCardIndex % colors.length].bg,
                    color: colors[currentCardIndex % colors.length].text,
                  }}
                >
                  <div className="flashcard-content">
                    <h3>{flashcards[currentCardIndex].front}</h3>
                    <p>{flashcards[currentCardIndex].back}</p>
                  </div>
                </div>
              </TinderCard>
            </div>
            <div>
                {showSaveOption && <div className="swipe-indicator save">Save</div>}
              {showSkipOption && <div className="swipe-indicator skip">Skip</div>}
            </div>
            </>
            
          )}
        </div>
      )}

      {feedbackModalOpen && (
        <div className="feedback-modal">
          <h3>Did you find these flashcards helpful?</h3>
          <div className="feedback-buttons">
            <button onClick={() => handleFeedback('yes')} className="btn feedback-yes">Yes</button>
            <button onClick={() => handleFeedback('no')} className="btn feedback-no">No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
