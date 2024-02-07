import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
// import { fetchStoryById, updateStory } from '../services/storyService';

function EditStoryPage() {
  const { storyId } = useParams();
  const history = useHistory();
  const [story, setStory] = useState({ title: "", content: "" });

  useEffect(() => {
    // Fetch the story details by ID
    const fetchStoryDetails = async () => {
      // const response = await fetchStoryById(storyId);
      // setStory(response.data);
      // Placeholder for fetched story data
      setStory({
        title: "The Forgotten City",
        content:
          "Once upon a time, in a forgotten city, something mysterious happened...",
      });
    };

    fetchStoryDetails();
  }, [storyId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStory((prevStory) => ({ ...prevStory, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Update the story details
    // await updateStory(storyId, story);
    console.log("Story updated:", story);
    history.push("/gallery"); // Redirect to the gallery page
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Edit Story
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            name="title"
            value={story.title}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Content"
            name="content"
            multiline
            rows={4}
            value={story.content}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditStoryPage;
