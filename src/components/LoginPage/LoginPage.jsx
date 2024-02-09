import React from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import { Container, Typography, Button, Paper, Box } from "@mui/material";

function LoginPage() {
  const history = useHistory();

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ marginBottom: 3 }}
        >
          Welcome Back
        </Typography>
        <LoginForm />
        <Box mt={4} width="100%">
          <Typography variant="body1" gutterBottom>
            Don't have an account?
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;
