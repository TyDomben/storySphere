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

  // const [tempStories] = useState([
  //   {
  //     id: 1,
  //     title: "The Adventure Begins",
  //     summary: "An exciting journey starts in the heart of the ancient woods.",
  //   },
  //   {
  //     id: 2,
  //     title: "Lost in Time",
  //     summary: "A mysterious tale of time travel and lost civilizations.",
  //   },
  //   {
  //     id: 3,
  //     title: "The Last Stand",
  //     summary:
  //       "Heroes face their toughest challenge yet in a battle to save the world.",
  //   },
  //   {
  //     id: 4,
  //     title: "The Legend Continues",
  //     summary: "A mysterious tale of time travel and lost civilizations.",
  //   },
  //   {
  //     id: 5,
  //     title: "The Legend Continues",
  //     summary: "A mysterious tale of time travel and lost civilizations.",
  //   },
  //   {
  //     id: 6,
  //     title: "The Legend Continues",
  //     summary: "A mysterious tale of time travel and lost civilizations.",
  //   },
  //   {
  //     id: 7,
  //     title: "The Adventure Begins",
  //     summary: "An exciting journey starts in the heart of the ancient woods.",
  //   },
  //   {
  //     id: 8,
  //     title: "Lost in Time",
  //     summary: "A mysterious tale of time travel and lost civilizations.",
  //   },
  //   {
  //     id: 9,
  //     title: "The Last Stand",
  //     summary:
  //       "Heroes face their toughest challenge yet in a battle to save the world.",
  //   },
  //   {
  //     id: 10,
  //     title: "The Legend Continues",
  //     summary: "A mysterious tale of time travel and lost civilizations.",
  //   },
  //   {
  //     id: 11,
  //     title: "The Legend Continues",
  //     summary: "A mysterious tale of time travel and lost civilizations.",
  //   },
  //   {
  //     id: 12,
  //     title: "The Legend Continues",
  //     summary: "A mysterious tale of time travel and lost civilizations.",
  //   },
  // ]);

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
    // Add logic to delete the story
    console.log(`Delete story with id ${storyId}`);
    dispatch(deleteStoryRequest(storyId));

    // remove it from the state or refresh the list.
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
                  {story.summary}
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
