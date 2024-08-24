// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const [userData, setUserData] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/'); // Redirect to the homepage if the user is not signed in
    } else {
      // Store and update user data from Clerk's `useUser` hook
      const firstName = user?.firstName || sessionStorage.getItem('firstName') || '';
      const lastName = user?.lastName || sessionStorage.getItem('lastName') || '';

      if (firstName && lastName) {
        sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('lastName', lastName);
      }

      setUserData({ firstName, lastName });
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div className="dashboard">
      <h1>Welcome to CardifyAI, {userData.firstName} {userData.lastName}!</h1>
      <p>Your personal flashcard dashboard.</p>
    </div>
  );
};

export default Dashboard;
