import React, { useEffect, useState } from 'react';
import { useUser, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = (showPlus) => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser(); // Destructure to get user and isLoaded
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
  });
  console.log(showPlus)

  useEffect(() => {
    if (isLoaded && user) {
      // Set user data once it's loaded
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
      });

    }
  }, [isLoaded, user]);

  console.log("User data in header:", userData);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate('/')}>
          <h1>CardifyAI</h1>
        </div>
        <SignedIn>
          <div className="user-info">
            {showPlus.showPlus ? (
              <>
              plus
              </>
            ) : null }
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
