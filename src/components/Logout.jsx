import  { redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";




const Logout = ({ onLogout }) => {
  useEffect( () => {
    onLogout();
    
  }, []);
  // const handleLogout = () => {
    
  // };
  // return redirect("/");
  return (
    // <button type="button" className="btn btn-primary" onClick={onLogout}>Logout</button>
    <Navigate to="/" />

  );
};

export default Logout;
