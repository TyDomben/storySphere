import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              StorySphere
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Where Words Come to Life
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Redefining digital storytelling through immersive experiences.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Explore
            </Typography>
            <Link href="/about" color="inherit" underline="hover">About Us</Link><br/>
            <Link href="/gallery" color="inherit" underline="hover">Gallery</Link><br/>
            <Link href="/story-editor" color="inherit" underline="hover">Write a Story</Link><br/>
            {/* Add more links as needed */}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Connect
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Follow us on social media to stay updated with the latest news and stories.
            </Typography>
            {/* Consider adding text links or simply a message encouraging to connect on social media */}
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ pt: 4 }}
        >
          &copy; {new Date().getFullYear()} StorySphere. Embrace the narrative journey.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
