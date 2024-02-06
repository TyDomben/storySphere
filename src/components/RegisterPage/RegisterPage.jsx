import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function RegisterPage() {
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <RegisterForm />

      <center style={{ marginTop: "20px" }}>
        <Typography variant="body1">
          Already have an account?
          <Button
            color="primary"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
        </Typography>
      </center>
    </Container>
  );
}

export default RegisterPage;
