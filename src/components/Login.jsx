// src/Login.jsx
import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <SignIn
        afterSignIn={() => navigate('/dashboard')} // Redirect to dashboard after login
      />
    </div>
  );
};

export default Login;
