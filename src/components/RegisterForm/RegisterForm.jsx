import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Typography, Paper } from "@mui/material";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" component="h3">
        Register User
      </Typography>
      {errors.registrationMessage && (
        <Typography color="error" role="alert">
          {errors.registrationMessage}
        </Typography>
      )}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        required
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        required
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        onClick={registerUser}
      >
        Register
      </Button>
    </Paper>
  );
}

export default RegisterForm;
