// src/components/Header.jsx
import {React, useState} from 'react';
import { useUser, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
   const [userData, setUserData] = useState({
    firstName: sessionStorage.getItem('firstName') || '',
    lastName: sessionStorage.getItem('lastName') || '',
  });

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate('/')}>
          <h1>CardifyAI</h1>
        </div>
        <SignedIn>
          <div className="user-info">
            <span>{userData.firstName} {userData.lastName}</span>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <button className="btn sign-in-btn" onClick={() => navigate('/login')}>Sign In</button>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
