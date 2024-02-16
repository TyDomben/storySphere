/**
 * Desk Component - User Interaction and Content Generation
 *
 * This component serves as the primary user interaction interface for generating stories and images.
 * It guides the user through a multi-step process using a Material UI Stepper component, culminating in the generation of content.
 *
 * Steps:
 * 1. Input Story Idea - User enters the concept for their story.
 * 2. Craft Title - User provides a title for their story.
 * 3. Review - User reviews their inputs before submission.
 * 4. Generating Content - Displays progress as the story and image are being generated.
 * 5. View Gallery - Option to navigate to the gallery to view the generated content.
 *
 * Features:
 * - Utilizes Redux actions for asynchronous content generation.
 * - Simulates a waiting period during content generation to manage user expectations.
 * - Provides a seamless transition to the gallery upon completion.
 *
 * Enhancements:
 * - Implement real-time feedback on content generation progress.
 * - Optimize loading state management for a smoother UX during content generation.
 */

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
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as storyActions from "../../redux/actions/actions";
import { useHistory } from "react-router-dom";

function Desk() {
  // Redux setup for dispatching actions
  const dispatch = useDispatch();
  const history = useHistory();
  // State management for stepper progress and loading indicator
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  // Stepper steps definition
  const steps = [
    "Input Story Idea",
    "Craft Title",
    "Review",
    "Generating Content",
    "View Gallery",
  ];
  // State for user inputs
  const [storyIdea, setStoryIdea] = useState("");
  const [title, setTitle] = useState("");
  // Fetching user ID from global state for associating content with the user
  const userId = useSelector((state) => state.user.id);

  const handleNext = () => {
    if (activeStep === 2) {
      // On review step
      setLoading(true);
      // Immediately provide feedback that content generation is underway
      setTimeout(() => {
        setLoading(false);
        setActiveStep((prev) => prev + 1); // Move to generating content step
      }, 1000); // Simulated generation delay

      // Trigger content generation
      dispatch(
        storyActions.generateStoryRequest({
          prompt: storyIdea,
          title,
          userId,
        })
      );
      dispatch(
        storyActions.generateImageRequest({
          prompt: storyIdea,
          caption: title,
          userId,
        })
      );
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const goToGallery = () => history.push("/gallery");
  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Story Idea Input
        return (
          <TextField
            label="Describe Your Story Idea"
            multiline
            rows={4}
            value={storyIdea}
            onChange={(e) => setStoryIdea(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        );
      case 1: // Title Crafting
        return (
          <TextField
            label="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        );
      case 2: // Review Inputs
        return (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Review Your Inputs
            </Typography>
            <Typography>
              <strong>Story Idea:</strong> {storyIdea}
            </Typography>
            <Typography>
              <strong>Title:</strong> {title}
            </Typography>
          </>
        );
      case 3: // Generating Content
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>
              Generating your story and image, please wait...if ten seconds pass
              please click NEXT
            </Typography>
          </Box>
        );
      case 4: // View Gallery
        return (
          <Typography>
            Content generated! Click "Go to Gallery" to view your story and
            image in the gallery.
          </Typography>
        );
      default:
        return "Unknown step";
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
        <Box sx={{ p: 3 }}>
          {renderStepContent()}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>
            {activeStep < steps.length - 1 && (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button variant="contained" color="primary" onClick={goToGallery}>
                Go to Gallery
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Desk;
