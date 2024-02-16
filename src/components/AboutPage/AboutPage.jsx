/**
 * About Page Component
 *
 * Overview:
 * - Presents information about the application and its creator.
 * - Offers links to the creator's professional profiles on GitHub and LinkedIn.
 * - Includes a form for users to join a newsletter, demonstrating CRUD operations.
 *
 * Features:
 * - Typography for textual content about the application and the creator.
 * - Links to GitHub and LinkedIn for professional connection.
 * - A sign-up form for the newsletter, showcasing form handling in React.
 *
 * Future Enhancements:
 * - Dynamic fetching of GitHub and LinkedIn URLs from a database or API.
 * - Integration with a backend service for newsletter sign-up functionality.
 * - Implementation of confirmation feedback upon successful newsletter sign-up.
 */

import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Link,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
} from "@mui/material";

function AboutPage() {
  const [email, setEmail] = useState(""); // State to hold email input for newsletter sign-up

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Dispatch the email to your store or server
    console.log(email);
    setEmail(""); // Reset the email input field
    // Show a confirmation message
    alert("Thank you for signing up for our newsletter!");
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={6} sx={{ p: 5 }}>
        {/* we are aiming for horizontal qr codes */}
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
          sx={{ mb: 1 }} // add margin bottom to the grid container
        >
          {/* Text Content */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              About StorySphere
            </Typography>
            <Typography variant="body1">
              Storysphere is a labor of love. I'm Ty, the "Author" of this
              application, and I want to thank you for checking it out. I hope
              you enjoy it. It's wholesome fun and you should consider sharing it with your friends!
            </Typography>
          </Grid>
        </Grid>

        {/* GitHub QR Code with clickable link */}
        <Grid item xs={12} sm={6}>
          <Link
            href="https://github.com/TyDomben/TyDomben"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  style={{ height: "128px", width: "128px" }}
                  image="../../github_qr.png"
                  alt="GitHub QR Code"
                  title="GitHub QR Code"
                />
              </CardActionArea>
            </Card>
          </Link>
        </Grid>

        {/* Text Content */}
        <Grid item xs={12} sm={6}>
          {/* <Typography variant="subtitle1">
            StorySphere is a web application that allows users to create and
            share their own stories. It is built with React, Node.js, and
            PostgreSQL.
            This is good but i should expand on this quite a bit
          </Typography> */}
          <Typography variant="body1" sx={{ my: 2 }}>
            I'm looking for full-time employment following my graduation from
            Prime and encourage you to check out my GitHub and LinkedIn.
            Clickable links and scannable codes.
            {/* //? I could add a headshot here */}
          </Typography>
        </Grid>

        {/* LinkedIn QR Code with clickable link */}
        <Grid item xs={4} sm={2}>
          <Link
            href="https://www.linkedin.com/in/ty-domben-4613ba13a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  style={{ height: "128px", width: "128px" }}
                  image="../../linkedin_qr.png"
                  alt="LinkedIn QR Code"
                  title="LinkedIn QR Code"
                />
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Typography variant="body2">
          StorySphere: Where Words Come to Life…
        </Typography>
        {/* Newsletter sign-up form */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Join Our Newsletter
          </Typography>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 1 }}>
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AboutPage;
