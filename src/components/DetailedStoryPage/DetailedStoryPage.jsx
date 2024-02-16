/**
 * DetailedStoryPage Component
 *
 * This component is responsible for rendering a detailed view of a specific story, including its associated image.
 * It fetches story details and the corresponding image based on the story ID provided in the URL parameters.
 *
 * Current Limitations:
 * - The relationship between stories and images is not enforced at the database level through foreign keys,
 *   which may lead to scalability issues in production.
 * - The image fetching logic assumes a direct match between story IDs and image IDs, which might not hold true
 *   in all cases. A more robust solution would involve explicitly linking images to their stories in the database.
 *
 * Potential Improvements:
 * - Implementing foreign key constraints in the database schema to solidify the relationship between stories and images.
 * - Adjusting the API and frontend logic to handle cases where stories may have multiple images or no images.
 * - Including error handling for cases where the story or image does not exist to improve user experience.
 *
 * Default Image Fallback:
 * - In cases where an image cannot be fetched, a default image is displayed. This ensures that the UI remains
 *   user-friendly and visually consistent, even when data fetching issues occur. It's a AI generation of my dog Loki, which is adorable.
 */

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  CardMedia,
} from "@mui/material";
import axios from "axios";

function DetailedStoryPage() {
  const { storyId } = useParams();
  const history = useHistory();
  const [story, setStory] = useState({});
    // Initialize with a default image state
  const [image, setImage] = useState({
    url: "/v-puppy.png",
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
          setImage(imageResponse.data); // DATA contains all of what we need, as a theme thoughout this application
        }
      } catch (error) {
        console.error("Failed to fetch image for story", error);
      }
    };

    
    fetchStoryDetails();
    fetchImage();
  }, [storyId]);
  // dependency array   

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {story.title}
          {/* title as the user input directly */}
        </Typography>
        <Typography variant="body1">{story.content}</Typography>
        {/* content as the user input directly */}
        {/* <Typography variant="h5" component="h2" gutterBottom>
          {story.content.title}
        {/* <Typography variant="body1">{story.content.text}</Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* here we are displaying an image that corresponds with the story */}
            <CardMedia
              component="img"
              image={image.url}
              alt={image.caption}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
        <Button
          type="button"
          fullWidth
          size="large"
          sx={{ mt: 3, mb: 2 }}
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
