import React from "react";
import { Container, Typography, Paper } from "@mui/material";
// Typography is the art of arranging letters and text to make written language legible, readable, and visually appealing. - from internet search
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Container component="main" maxWidth="md">
      {/* // Container - center horizontally // component - the main one // maxWidth
      - the max width of the container - medium here */}
      <Paper elevation={6} style={{ padding: "2rem" }}>
        {/* rem unit means "The root element's font-size */}
        {/* // Paper somewhere to place MUI components - like a sheet of paper //
        elevation - the elevation of the paper - 6 here - like a shadow */}
        <Typography variant="body1">
          StorySphere is a cutting-edge digital storytelling platform that
          redefines the way stories are told, shared, and experienced in the
          digital age. With StorySphere, users can bring their narratives to
          life through text, with the possibility of enhancement with
          AI-generated images and immersive audio soundscapes, creating a
          multi-sensory storytelling experience.
        </Typography>
        <Typography variant="body1" style={{ marginTop: "1rem" }}> 
        {/* using style from inline styling instead of sx from MUI */}
          We believe in empowering people to share their stories in the most
          engaging way possible, utilizing the latest advancements in artificial
          intelligence and multimedia technology. Our mission is to create a
          community where every voice can be heard and every story can be
          brought to life.
        </Typography>
        <Typography variant="body1" style={{ marginTop: "1rem" }}> StorySphere: Where Words Come to Life…</Typography>
      </Paper>
    </Container>
  );
}

export default AboutPage;
