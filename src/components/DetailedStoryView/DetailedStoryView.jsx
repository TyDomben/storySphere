import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";

function DetailedStoryView() {
  const { storyId } = useParams();
  const history = useHistory();

  // Placeholder data // should be mapping through gallery 
  const story = {
    title: "The Forgotten City",
    content:
      "Once upon a time, in a forgotten city, a secret lay hidden for centuries...",
    author: "Ty Domben",
    publishedDate: "March 3, 2024",
    lastUpdated: "March 10, 2024",
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {story.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          By {story.author}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Published on {story.publishedDate} | Last updated on{" "}
          {story.lastUpdated}
        </Typography>
        <Box my={2}>
          <Typography variant="body1">{story.content}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.goBack()}
        >
          Back to Gallery
        </Button>
      </Box>
    </Container>
  );
}

export default DetailedStoryView;
