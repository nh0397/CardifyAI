// src/components/Dashboard.jsx
import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './Dashboard.css';
import { FaPlusCircle } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: sessionStorage.getItem('firstName') || '',
    lastName: sessionStorage.getItem('lastName') || '',
  });

  // Placeholder for checking if flashcards exist
  const flashcardsExist = false; // This should be replaced with actual logic

  const handleCreateNewSet = () => {
    // Logic to create a new set of flashcards
    console.log("Creating a new set of flashcards...");
    // navigate to the flashcard creation page
  };

  return (
    <div className="dashboard">
      {!flashcardsExist ? (
        <div className="empty-state">
          <h2>Hello, {userData.firstName}! It looks like you haven't created any flashcards yet.</h2>
          <p>Let's get started by creating your first set of AI-powered flashcards!</p>
          <FaPlusCircle className="plus-icon" onClick={handleCreateNewSet} />
        </div>
      ) : (
        <div>
          {/* Flashcards content goes here */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
