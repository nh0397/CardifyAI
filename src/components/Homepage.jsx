// src/components/Homepage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, SignedOut, SignedIn, SignInButton, SignUpButton } from '@clerk/clerk-react';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="homepage">
      <h1>Welcome to CardifyAI</h1>
      <p>AI-Generated Flashcards for Effective Learning</p>
      <div className="auth-buttons">
        <SignedOut>
          <SignInButton mode="modal" redirectUrl="/dashboard">
            <button className="btn">Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal" redirectUrl="/dashboard">
            <button className="btn">Sign Up</button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <p>You are already signed in! Redirecting to your <a href="/dashboard">Dashboard</a>.</p>
        </SignedIn>
      </div>
    </div>
  );
};

export default Homepage;
