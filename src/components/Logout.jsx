import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    
    onLogout();
  };

  return (
    <button type="button" className="btn btn-primary" onClick={onLogout}>Logout</button>
  );
};

export default Logout;
