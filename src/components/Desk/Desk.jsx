import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
// https://mui.com/material-ui/react-stepper/

function Desk() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleGenerateStory = () => {
    // TODO: Replace with actual story generation logic
    setGeneratedStory("Generated story based on the input prompt.");
  };

  const handleAddImageToStory = () => {
    // TODO: Replace with actual logic to set the image URL
    setImageURL("URL-of-the-generated-image");
  };

  const handleAddStoryToCollection = () => {
    // TODO: Implement functionality to add story to user's collection
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Writing Desk
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          <TextField
            label="Input Prompt"
            multiline
            rows={4}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleGenerateStory}>
            Generate Story
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Generated Story:
          </Typography>
          <Typography sx={{ mb: 2 }}>{generatedStory}</Typography>
          <TextField
            label="Generated Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleAddImageToStory}>
            Add Image to Story
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddStoryToCollection}
        >
          Add Story to Collection
        </Button>
      </Paper>
    </Box>
  );
}

export default Desk;
