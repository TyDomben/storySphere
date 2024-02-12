import React from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Button, Box } from "@mui/material";
import LogOutButton from "../LogOutButton/LogOutButton";

function UserPage() {
  const user = useSelector((store) => store.user);

  return (
    <Container
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundSize: "cover",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user.username}!
      </Typography>
      <Typography variant="subtitle1">Your ID is: {user.id}</Typography>
      <Box sx={{ mt: 2 }}>
        <LogOutButton className="btn" />
        {/* Example Button for additional actions */}
        <Button variant="contained" color="primary" sx={{ ml: 2 }}>
          PLACEHOLDER BUTTON
        </Button>
      </Box>
    </Container>
  );
}

export default UserPage;
