import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './css/style.css';
// import './css/Header.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const clientId = '665641574696-hm79hmbe8o11kh5mb7277p5l4ne072tk.apps.googleusercontent.com'; // Replace with your actual Google Client ID

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
