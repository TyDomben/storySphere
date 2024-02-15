import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Typography, Box, Button, Grid, CardMedia } from "@mui/material";
import axios from "axios";

function DetailedStoryPage() {
  const { storyId } = useParams();
  const history = useHistory();
  const [story, setStory] = useState({});
  const [image, setImage] = useState({
    url: "/v-puppy.png", // Ensure this default image path is correct
    caption: "Default image",
  });

  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const storyResponse = await axios.get(`/api/text/${storyId}`);
        setStory(storyResponse.data);
      } catch (error) {
        console.error("Failed to fetch story", error);
      }
    };

    const fetchImage = async () => {
      try {
        const imageResponse = await axios.get(`/api/images/${storyId}`);
        if (imageResponse.data) {
          setImage(imageResponse.data); // Assuming the response directly contains the image object
        }
      } catch (error) {
        console.error("Failed to fetch image for story", error);
      }
    };

    fetchStoryDetails();
    fetchImage();
  }, [storyId]);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {story.title}
        </Typography>
        <Typography variant="body1">{story.content}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardMedia
              component="img"
              image={image.url}
              alt={image.caption}
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={() => history.goBack()}>
          Back to Gallery
        </Button>
      </Box>
    </Container>
  );
}

export default DetailedStoryPage;
