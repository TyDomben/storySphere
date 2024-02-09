import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useHistory } from "react-router-dom"; // Import useHistory from 'react-router-dom'

function LandingPage() {
  const history = useHistory(); // Access the history instance for navigation

  const handleExplore = () => {
    history.push("/gallery"); // Adjusted to an existing route
  };

  return (
    <Grid container spacing={0}>
      {/* Left side with image */}
      <Grid item xs={12} md={6}>
        <div
          style={{
            backgroundImage: "url(public/v-puppy.png)",

            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "100vh",
          }}
        >
          {/* Content over image can go here if needed */}
          <b>
            {" "}
            "Show me a picture of my Vizsla puppy, Loki. Wearing a red hat and a
            blue scarf."
          </b>
        </div>
      </Grid>

      {/* Right side with content */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to StorySphere
        </Typography>
        <Typography variant="subtitle1" paragraph>
          Where Words Come to Life…
        </Typography>
        <RegisterForm />
        <Button
          variant="contained"
          color="primary"
          onClick={handleExplore}
          sx={{ mt: 2 }}
        >
          Explore Stories
        </Button>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
