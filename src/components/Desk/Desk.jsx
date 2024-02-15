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
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const steps = [
    "Input Story Idea",
    "Craft Title",
    "Review",
    "Generating Content",
    "View Gallery",
  ];
  const [storyIdea, setStoryIdea] = useState("");
  const [title, setTitle] = useState("");
  const userId = useSelector((state) => state.user.id);

  const handleNext = () => {
    if (activeStep === 2) {
      // On review step
      setLoading(true);
      // Immediately provide feedback that content generation is underway
      setTimeout(() => {
        setLoading(false);
        setActiveStep((prev) => prev + 1); // Move to generating content step
      }, 10000); // Simulated generation delay

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
              Generating your story and image, please wait...if ten seconds go by click NEXT
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
              <Button variant="contained"  onClick={handleNext}>
                Next
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button variant="contained" color="inherit" onClick={goToGallery}>
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
