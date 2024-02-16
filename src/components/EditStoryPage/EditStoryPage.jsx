/**
 * EditStoryPage Component
 * 
 * Purpose:
 * The EditStoryPage component is designed for users to edit the title and content of an existing story.
 * This component showcases a form populated with the current title and content of the story, allowing for modifications.
 * 
 * Features:
 * - Fetches story details based on the story ID obtained from URL parameters using React Router's `useParams`.
 * - Provides a form allowing users to edit and submit changes to a story's title and content.
 * - Utilizes Axios for HTTP requests to fetch current story details and submit updates.
 * - Redirects the user back to the gallery page upon successful update, enhancing user experience and flow.
 * 
 * Implementation Details:
 * - State management with React's useState hook to hold and update story data.
 * - useEffect hook to fetch the current story details when the component mounts or the story ID changes.
 * - Form submission handling that updates the story on the backend and navigates the user upon success.
 * 
 * Usage:
 * This component is accessed through a route parameter specifying the story ID, enabling dynamic fetching and editing based on the story selected.
 * 
 * Future Enhancements:
 * - Implementing form validation to ensure data integrity.
 * - Adding loading states and user feedback during fetch and update operations for a smoother user experience.
 * - Considering the use of a richer text editor for content editing to allow more elaborate storytelling.
 */

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import axios from "axios";

// EditStoryPage allows users to edit an existing story's title and content.
function EditStoryPage() {
    // Extracting the story ID from the URL parameters.
  const { storyId } = useParams();
  const history = useHistory();
    // State for holding the story data (title and content).
  const [story, setStory] = useState({ title: "", content: "" });

  useEffect(() => {
        // Fetch the story details from the server upon component mount or when the storyId changes.
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
