import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
// import { Container, Typography, Button, Box } from '@mui/material';
// import LogOutButton from '../LogOutButton/LogOutButton'; 
// Ensure this component is adapted to use MUI Button if not already
// TODO make this page more interesting !
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
