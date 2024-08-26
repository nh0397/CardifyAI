import React, { useEffect, useState } from 'react';
import { useUser, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaPlusCircle } from 'react-icons/fa';

const Header = ({ showPlus, toggleModal }) => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (isLoaded && user) {
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [isLoaded, user]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate('/')}>
          <h1>CardifyAI</h1>
        </div>
        <SignedIn>
          <div className="user-info">
            {showPlus && (
              <FaPlusCircle
                className="plus-icon-header"
                title="Add new cards"
                onClick={toggleModal}
              />
            )}
            <span>{userData.firstName} {userData.lastName}</span>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <button className="btn sign-in-btn" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
