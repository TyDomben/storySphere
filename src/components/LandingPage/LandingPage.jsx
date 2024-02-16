/**
 * Landing Page Component
 * 
 * Purpose:
 * - Serves as the entry point to the StorySphere application, providing users with a warm welcome and an immediate option to explore stories.
 * - Features a visually appealing split layout with an engaging background image on one side and application introduction on the other.
 * 
 * Functionality:
 * - Displays a custom welcome message and a brief introduction to what StorySphere offers.
 * - Includes a registration form component for new users to sign up.
 * - Provides an "Explore Stories" button for users to quickly navigate to the gallery of stories.
 * 
 * Styling:
 * - Utilizes Material UI's Grid system for responsive layout design.
 * - The left side showcases a thematic background image to captivate user interest.
 * - The right side contains textual content and interaction elements, styled for clarity and ease of use.
 * 
 * Navigation:
 * - Uses `useHistory` hook from `react-router-dom` for programmatic navigation, enabling users to proceed to the gallery upon interaction.
 */

import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useHistory } from "react-router-dom"; // Import useHistory for navigation

function LandingPage() {
  const history = useHistory(); // Access the history instance for navigation

  const handleExplore = () => {
    history.push("/gallery"); // Navigate to the gallery page
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
