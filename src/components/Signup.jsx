// src/components/Signup.jsx
import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import './Signup.css';

const Signup = () => {
  return (
    <div className="auth-page">
      <SignUp />
    </div>
  );
};

export default Signup;
