import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Dashboard.css';
import generateFlashcards from '../services/gemini';
import ProcessingModal from './ProcessingModal';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-react';

const Dashboard = ({ setShowPlus, toggleModal, modalOpen }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const { isLoaded, user } = useUser();

  // Fetch flashcard sets for the user
  const fetchFlashcardSets = async () => {
    if (user) {
      const userId = `${user.firstName}-${user.lastName}`;
      const flashcardsRef = collection(db, 'users', userId, 'flashcards');
      const snapshot = await getDocs(flashcardsRef);
      const sets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      if (sets.length > 0) {
        setShowPlus(true);
      }
      setFlashcardSets(sets);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchFlashcardSets();
    }
  }, [isLoaded, user]);

  const handleCreateNewSet = async (topic) => {
    setLoading(true);
    toggleModal();
    try {
      const generatedFlashcards = await generateFlashcards(topic);
      const userId = `${user.firstName}-${user.lastName}`;
      const flashcardsRef = collection(db, 'users', userId, 'flashcards');
      
      await addDoc(flashcardsRef, {
        title: topic,
        flashcards: generatedFlashcards,
        timestamp: new Date(),
      });

      fetchFlashcardSets();
    } catch (error) {
      console.error('Error generating flashcards:', error);
      setLoading(false);
    }
  };

  const handleSetClick = (set) => {
    setSelectedSet(set);
    setFlashcards(set.flashcards);
    setCurrentCardIndex(0);
    setShowFlashcards(true);
  };

  const handleCloseFlashcards = () => {
    setShowFlashcards(false);
    setSelectedSet(null);
  };

  const handleSwipeLeft = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  return (
    <div className="dashboard">
      <ProcessingModal
        show={modalOpen}
        onClose={toggleModal}
        onSubmit={handleCreateNewSet}
      />

      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading your flashcards...</p>
        </div>
      ) : (
        <>
          {flashcardSets.length === 0 ? (
            <div className="empty-state">
              <h2>It looks like you haven't created any flashcards yet.</h2>
              <p>Click the plus icon to get started with your first set of AI-powered flashcards!</p>
              <FaPlusCircle className="plus-icon" onClick={toggleModal} />
            </div>
          ) : (
            <div className="flashcard-set-grid">
              {flashcardSets.map((set) => (
                <div
                  key={set.id}
                  className="flashcard-set-card"
                  onClick={() => handleSetClick(set)}
                >
                  <div className="card-thumbnail">
                    <h3>{set.title}</h3>
                  </div>
                  <div className="card-info">
                    <p>Created on {new Date(set.timestamp.seconds * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showFlashcards && (
            <div className="flashcard-container">
              <div className="flashcard-wrapper">
                <FaTimes className="close-icon" onClick={handleCloseFlashcards} />
                <div
                  className="flashcard"
                  style={{
                    backgroundColor: currentCardIndex % 2 === 0 ? '#FFD700' : '#FF6347', // Gold and Tomato colors
                    color: currentCardIndex % 2 === 0 ? '#000' : '#FFF', // Text color
                  }}
                >
                  <div className="flashcard-content">
                    <h3>{flashcards[currentCardIndex].front}</h3>
                    <p>{flashcards[currentCardIndex].back}</p>
                  </div>
                </div>

                <div className="button-group">
                  <button onClick={handleSwipeLeft} disabled={currentCardIndex === 0}>
                    <FaArrowLeft /> Left
                  </button>
                  <button onClick={handleSwipeRight} disabled={currentCardIndex === flashcards.length - 1}>
                    Right <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
