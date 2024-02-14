import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  CardActions,
  IconButton,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";

const { fetchStoriesRequest, deleteStoryRequest } = actions;
const { fetchImagesRequest } = actions;

// Gallery component

function Gallery() {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.text.stories); // text from redux store
  const user = useSelector((state) => state.user); // user from redux store
  const images = useSelector((state) => state.image.images); // images from redux store

  useEffect(() => {
    dispatch(fetchStoriesRequest());
    dispatch(fetchImagesRequest());
  }, [dispatch]);

  const history = useHistory();

  const handleStoryClick = (storyId) => {
    history.push(`/gallery/${storyId}`);
  };
  const handleViewStory = (storyId) => {
    history.push(`/gallery/${storyId}`);
  };

  const handleEditStory = (storyId) => {
    // Navigate to the edit page for the story
    history.push(`/edit/${storyId}`);
  };

  const handleDeleteStory = (storyId) => {
    console.log(`Delete story with id ${storyId}`);

    const shouldDelete = confirm("Are you sure you want to delete this story?"); // Ask for confirmation
    if (shouldDelete) {
      dispatch(deleteStoryRequest(storyId));
    }
  };

  return (
    <Grid container spacing={4} style={{ padding: "24px" }}>
      {images.map((image) => (
        <Grid item xs={12} sm={6} md={4} key={image.id}>
          <Card>
            <CardActionArea>
              <img
                src={image.url}
                alt={image.caption}
                style={{ width: "100%" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {image.caption}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      {stories.map((story) => (
        <Grid item xs={12} sm={6} md={4} key={story.id}>
          <Card>
            <CardActionArea onClick={() => handleViewStory(story.id)}>
              <Card onClick={() => handleStoryClick(story.id)} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {story.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {story.content}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
              <IconButton
                aria-label="view story"
                onClick={() => handleViewStory(story.id)}
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton
                aria-label="edit story"
                onClick={() => handleEditStory(story.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete story"
                onClick={() => handleDeleteStory(story.id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Gallery;
