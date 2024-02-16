/**
 * Gallery Component
 *
 * Overview:
 * The Gallery component displays a collection of stories with their associated images.
 * It provides a visual representation of stories that users can interact with, including viewing, editing, and deleting stories.
 *
 * Note all actions are stored in actions.js
 * 
 * Features:
 * - Dynamically loads stories and their images from the Redux store, displaying them in a responsive grid layout.
 * - Utilizes Material UI components for consistent styling and responsiveness.
 * - Offers interactive card actions for each story, including viewing the detailed story page, editing the story, and deleting the story with confirmation.
 * - Fallback to a default image when a story does not have an associated image.
 *
 * Implementation Details:
 * - Uses `useEffect` to fetch stories and images on component mount or when dependencies change.
 * - Maps over the `stories` array from the Redux store to render a `Card` for each story.
 * - Attempts to find a matching image for each story based on the story ID; if not found, displays a default image.
 * - Uses `useHistory` from `react-router-dom` to programmatically navigate users to different routes based on their interactions.
 *
 * Usage:
 * Intended to be used as the primary means of browsing stories within the application.
 * Accessible directly via the `/gallery` route and linked from other parts of the application for easy navigation.
 */

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  CardActions,
  IconButton,
  CardMedia,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../redux/actions/actions";

const defaultImageUrl = "/v-puppy.png"; // Path to the default image when no image is associated with a story

function Gallery() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stories = useSelector((state) => state.text.stories); // Fetching stories from Redux store
  const images = useSelector((state) => state.image.images); // Fetching images from Redux store
  // Fetch stories and images on component mount
  useEffect(() => {
    dispatch(actions.fetchStoriesRequest());
    dispatch(actions.fetchImagesRequest());
  }, [dispatch]);
  // Navigate to the detailed story view
  const handleViewStory = (storyId) => {
    history.push(`/gallery/${storyId}`);
  };
  // Navigate to the story edit page
  const handleEditStory = (storyId) => {
    history.push(`/edit/${storyId}`);
  };
  // Handle story deletion with confirmation dialog
  const handleDeleteStory = (storyId) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      dispatch(actions.deleteStoryRequest(storyId));
    }
  };

  return (
    <Grid container spacing={4} style={{ padding: "24px" }}>
      {stories.map((story) => {
        // Attempt to find an image that matches the story ID
        const matchingImage = images.find((img) => img.id === story.id);

        return (
          <Grid item xs={12} sm={6} md={4} key={story.id}>
            <Card>
              <CardActionArea onClick={() => handleViewStory(story.id)}>
                <CardMedia
                  component="img"
                  image={matchingImage ? matchingImage.url : defaultImageUrl}
                  alt={matchingImage ? matchingImage.caption : "Default image"}
                  style={{ height: 140, width: "100%", objectFit: "cover" }} // Ensured the image covers the card area appropriately
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {story.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {story.content.length > 100
                      ? `${story.content.substring(0, 100)}...`
                      : story.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton
                  aria-label="view"
                  onClick={() => handleViewStory(story.id)}
                >
                  <VisibilityIcon />
                  {/* detailed view */}
                </IconButton>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditStory(story.id)}
                >
                  <EditIcon />
                  {/* Edit Story Component */}
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteStory(story.id)}
                >
                  <DeleteIcon />
                  {/* //!delete */}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Gallery;
