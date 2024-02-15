import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import axios from "axios";

function EditStoryPage() {
  const { storyId } = useParams();
  const history = useHistory();
  const [story, setStory] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const response = await axios.get(`/api/stories/${storyId}`);
        console.log("Fetched story details:", response.data); // Log fetched data
        setStory(response.data);
      } catch (error) {
        console.error("Failed to fetch story details", error);
      }
    };

    fetchStoryDetails();
  }, [storyId]);

  // Ensure handleChange updates the correct field in state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStory((prevStory) => ({ ...prevStory, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/stories/${storyId}`, story);
      console.log("Story updated:", story);
      history.push("/gallery");
    } catch (error) {
      console.error("Failed to update story", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>Edit Story</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            name="title"
            value={story.title || ''} // Fallback to an empty string if story.title is undefined
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
            value={story.content || ''} // Fallback to an empty string if story.content is undefined
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditStoryPage;
