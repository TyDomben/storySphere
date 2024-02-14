import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import axios from "axios";



function DetailedStoryPage() {
  const { storyId } = useParams();
  const history = useHistory();
  const [story, setStory] = useState({});
  //   const [story, setStory] = useState(null); // Use state to store the fetched story

  useEffect(() => {
    // Fetch the story details from your API
    const fetchStory = async () => {
      try {
        const response = await axios.get(`/api/text/${storyId}`);
        setStory(response.data); // Set the fetched story data into state
      } catch (error) {
        console.error("Failed to fetch story", error);
      }
    };

    fetchStory();
  }, [storyId]); // Re-run the effect if storyId changes

  if (!story) {
    return <div>Loading...</div>; // Display loading state or similar feedback
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {story.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          By {story.userId}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Published on {story.publishedDate} | Last updated on {story.lastUpdated}
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

export default DetailedStoryPage;
