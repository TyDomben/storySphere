import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";

function DetailedStoryPage() {
  const { storyId } = useParams();
  const history = useHistory();

  // Placeholder data // should be mapping through gallery
  // ok we are are rendering the correct storyId based on URL but that is all 
  // notably the contents of the story are also not evident on the gallery page 
  // i assume the contents are at storyId.contents however that is not rendering 

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {storyId.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          By {storyId.author}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Published on {storyId.publishedDate} | Last updated on{" "}
          {storyId.lastUpdated}
        </Typography>
        <Box my={2}>
          <Typography variant="body1">{storyId.content}</Typography>
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

export default DetailedStoryPage;
