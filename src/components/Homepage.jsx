// src/components/Homepage.jsx
import React, { useEffect, useState } from 'react';
import { useUser, ClerkLoading } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import Loader from './Loader';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      return; // Wait for Clerk to finish loading
    }

    if (isSignedIn) {
      navigate('/dashboard'); // Redirect to dashboard if already signed in
    } else {
      const signedOut = sessionStorage.getItem('signedOut');
      if (signedOut) {
        setShowContent(true); // Show content immediately without animation
        sessionStorage.removeItem('signedOut');
      } else {
        const timer = setTimeout(() => {
          setShowContent(true);
        }, 4000); // Delay before showing the main content after the cards flip
        return () => clearTimeout(timer);
      }
    }
  }, [isSignedIn, isLoaded, navigate]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="homepage">
      <div className="card-container">
        <div className="card flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front" />
            <div className="flip-card-back" />
          </div>
        </div>
        <div className="card flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front" />
            <div className="flip-card-back" />
          </div>
        </div>
        <div className="card flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front" />
            <div className="flip-card-back" />
          </div>
        </div>
      </div>
      <div className={`content ${showContent ? 'show' : ''}`}>
        <h1>Welcome to CardifyAI</h1>
        <p>AI-Generated Flashcards for Effective Learning</p>
        <div className="auth-buttons">
          <SignInButton mode="modal" redirectUrl="/dashboard">
            <button className="btn">Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal" redirectUrl="/dashboard">
            <button className="btn">Sign Up</button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
