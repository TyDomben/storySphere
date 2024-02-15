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

// Make sure the path to the default image is correctly referenced
// Assuming your build process copies the contents of the public folder correctly,
// and considering the typical structure of a React app, the path should be as follows:
const defaultImageUrl = "/v-puppy.png"; // Adjusted to use the correct path

function Gallery() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stories = useSelector((state) => state.text.stories);
  const images = useSelector((state) => state.image.images);

  useEffect(() => {
    dispatch(actions.fetchStoriesRequest());
    dispatch(actions.fetchImagesRequest());
  }, [dispatch]);

  const handleViewStory = (storyId) => {
    history.push(`/gallery/${storyId}`);
  };

  const handleEditStory = (storyId) => {
    history.push(`/edit/${storyId}`);
  };

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
                  style={{ height: 140, width: '100%', objectFit: 'cover' }} // Ensured the image covers the card area appropriately
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
                <IconButton aria-label="view" onClick={() => handleViewStory(story.id)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => handleEditStory(story.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDeleteStory(story.id)}>
                  <DeleteIcon />
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
