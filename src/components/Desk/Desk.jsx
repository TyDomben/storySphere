// Desk.jsx -- Desk component
// This component is responsible for generating a story based on user input.
// It also allows the user to add the generated story to their collection.
// It also allows the user to add an image to the story. STRETCH GOAL

// WORKFLOW - we want to POST using OPEN AI api - post the story to "stories" table
// "stories" table then refrences userid right now
// how am i choosing title? is that autogenerated based on iterating the save i.e. story1, story2, story3? or are we able to usetimestamps by default??
// content is what openAI is going to return to us based on the prompt we feed it - the prompt we feed it is going to be mostly what is in the text box.
// initially we need to get it to where it's just "todo list" type crud - just to get it done for now.
// we mayb want to introduce mui - steppers into this if we go so far as to do image and audio generation

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as storyActions from "../../redux/actions/actions";
import { generateStoryRequest } from "../../redux/actions/actions";
// import axios from 'axios';
// https://mui.com/material-ui/react-stepper/

function Desk() {
  const dispatch = useDispatch();
  // getter and setter for title of story
  const [title, setTitle] = useState("");
  // this next line is SUS, this assumes user is in state and we can get id from it? SUS -
  const userId = useSelector((state) => state.user.id);

  const [inputPrompt, setInputPrompt] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [createImage, setCreateImage] = useState("");

  // TODO this will be for prompting-right now we are going to just do a manual entry
  const handleGenerateStory = () => {
    console.log("Generate story feature coming soon...");
    //   // TODO: Replace with actual story generation logic
    //   // Dispatch the action with the prompt provided by the user
    //   dispatch(storyActions.generateStoryRequest(inputPrompt));
    // };
  };
  const handleAddImageToStory = () => {
    // TODO: Replace with actual logic to set the image URL
    setCreateImage("URL-of-the-generated-image");
  };

  const handleAddStoryToCollection = () => {
    const newStory = {
      title,
      content: inputPrompt,
      userid: userId, // Use the dynamically fetched user ID from that SUS statement above - the one i described as SUS
    };

    console.log(newStory);
    // Dispatch the action
    dispatch(storyActions.addStoryRequest(storyData));
    // Reset form
    setTitle("");
    setInputPrompt("");
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Writing Desk
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          {/* TODO this will be for prompting-right now we are going to just do a manual entry */}
          {/* <TextField
            label="Input Prompt"
            multiline
            rows={4}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          /> */}
          <TextField
            label="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Story Content"
            multiline
            rows={4}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleGenerateStory}
            disabled={false}
          >
            Generate Story (Coming Soon)
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Generated Story:
          </Typography>
          <Typography sx={{ mb: 2 }}>{generatedStory}</Typography>
          <TextField
            label="Generated Image URL"
            value={createImage}
            onChange={(e) => setCreateImage(e.target.value)}
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
