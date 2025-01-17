import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './css/style.css';
// import './css/Header.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google Client ID

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
