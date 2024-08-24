// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

ReactDOM.render(
  <ClerkProvider publishableKey={publishableKey}>
    <App />
  </ClerkProvider>,
  document.getElementById('root')
);
