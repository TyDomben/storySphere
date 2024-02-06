// LogOutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

function LogOutButton(props) {
  const dispatch = useDispatch();

  return (
    <Button
      className={props.className} // Allows for additional custom class names
      onClick={() => dispatch({ type: 'LOGOUT' })}
      variant="contained" // Gives the button a more distinct look
      color="secondary" // Designates the button color from the theme
      {...props} // Spreads any other prop passed to the button for further customization
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
