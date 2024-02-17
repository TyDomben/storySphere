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
  CardContent,
  CardActionArea,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

const techStack = [
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    title: "React",
    cols: 1,
    rows: 1,
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    title: "Node.js",
    cols: 1,
    rows: 1,
  },
  {
    img: "https://cdn.worldvectorlogo.com/logos/redux.svg",
    title: "Redux",
    cols: 1,
    rows: 1,
  },
  {
    img: "https://cdn.worldvectorlogo.com/logos/material-ui-1.svg",
    title: "Material-UI",
    cols: 1,
    rows: 1,
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
    title: "PostgreSQL",
    cols: 1,
    rows: 1,
  },
  {
    img: "https://seeklogo.com/images/P/passport-logo-16D89B2F37-seeklogo.com.png",
    title: "Passport",
    cols: 1,
    rows: 1,
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Cloudinary_logo.svg",
    title: "Cloudinary",
    cols: 1,
    rows: 1,
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg",
    title: "Git",
    cols: 1,
    rows: 1,
  },
  {
    img: "https://testing-library.com/img/octopus-128x128.png",
    title: "React Testing Library",
    cols: 1,
    rows: 1,
  },
  {
    img: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
    title: "Postman",
    cols: 1,
    rows: 1,
  },
  {
    img: "https://www.svgrepo.com/show/306500/openai.svg",
    title: "OpenAI",
    cols: 1,
    rows: 1,
  },
];

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
              you enjoy it. It's wholesome fun and you should consider sharing
              it with your friends!
            </Typography>
          </Grid>
        </Grid>
        <ImageList
          sx={{
            width: "100%",
            height: "auto",
            bgcolor: "rgba(255, 255, 255, 0.3)", // semi-transparent white for lightening
            borderRadius: "12px",
            overflow: "hidden",
            p: 2,
            boxShadow: 3,
            // For contrast, you might want to change the color of the text or icons inside as well:
            color: "primary.contrastText", // Ensures readable contrast on the primary color
          }}
          variant="quilted"
          cols={6}
          gap={8}
        >
          {techStack.map((tech, index) => (
            <ImageListItem key={index} cols={tech.cols} rows={tech.rows}>
              <img
                src={`${tech.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${tech.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={tech.title}
                loading="lazy"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "auto",
                }} // Adjust the max height and width as needed
              />
              <ImageListItemBar position="below" title={tech.title} />
            </ImageListItem>
          ))}
        </ImageList>
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
