// * Desk.jsx -- Desk component
// This component is responsible for generating a story based on user input.
// It also allows the user to add the generated story to their collection.
// It also allows the user to add an image to the story. STRETCH GOAL

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// useSelector for when we encorporate userId
import * as storyActions from "../../redux/actions/actions";
import axios from "axios";
// https://mui.com/material-ui/react-stepper/

function Desk() {
  // Invoke useDispatch inside the component to get the dispatch function
  const dispatch = useDispatch();
  // Stepper State Management
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Input Story Idea", "Craft Title", "Review"];

  // Input Field States
  const [storyIdea, setStoryIdea] = useState("");
  const [title, setTitle] = useState("");
  // ok so we have title and that doesn't need to go to API that can directly post
  // the story idea has to be sent to OPENAI API and we need the response to POST to DB

  // grab userId from the global state
  const userId = useSelector((state) => state.user.id);

  // Stepper Navigation Helper
  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  // Dynamic Rendering of Step Content
  const renderStepContent = () => {
    switch (activeStep) {
      // step 1 - input story idea
      case 0:
        return (
          <TextField
            label="Describe Your Story Idea"
            multiline
            rows={4}
            value={storyIdea}
            onChange={(e) => setStoryIdea(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        );
      // step 2 - craft title
      case 1:
        return (
          <TextField
            label="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        );
      // step 3 - review
      case 2:
        return (
          <div>
            <Typography sx={{ mb: 2 }}>Your Story Idea: {storyIdea}</Typography>
            <Typography sx={{ mb: 2 }}>Title: {title}</Typography>

            <Button variant="outlined" onClick={handleBack}>
              Edit
            </Button>
            <Button
              variant="outlined"
              // ! Add Story to Collection with API save here!
              // hardcode for testing will switch to something like this -
              // Example of getting userId from a global state or similar // const userId = useSelector(state => state.user.id); \
              // Then, when dispatching: // onClick={() => dispatch(storyActions.generateStoryRequest(storyIdea, userId))}

              // consider the following -
              // onClick={() =>
              //   dispatch(storyActions.generateStoryRequest(storyIdea, 1))
              // }
              onClick={() =>
                dispatch(
                  storyActions.generateStoryRequest({
                    prompt: storyIdea,
                    title: title, // Include the title from state
                    userId: userId, // This should be dynamically fetched based on logged-in user
                  })
                )
              }
            >
              Generate Story
            </Button>
          </div>
        );
      default:
        return "Something went wrong";
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Paper>
        <Typography variant="h4" gutterBottom>
          Writing Desk
        </Typography>

        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button variant="outlined" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Done" : "Next"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Desk;
