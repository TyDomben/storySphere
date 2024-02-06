import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";

function Gallery() {
  const [stories] = useState([
    {
      id: 1,
      title: "The Adventure Begins",
      summary: "An exciting journey starts in the heart of the ancient woods.",
    },
    {
      id: 2,
      title: "Lost in Time",
      summary: "A mysterious tale of time travel and lost civilizations.",
    },
    {
      id: 3,
      title: "The Last Stand",
      summary:
        "Heroes face their toughest challenge yet in a battle to save the world.",
    },
    {
      id: 4,
      title: "The Legend Continues",
      summary: "A mysterious tale of time travel and lost civilizations.",
    },
    {
      id: 5,
      title: "The Legend Continues",
      summary: "A mysterious tale of time travel and lost civilizations.",
    },
    {
      id: 6,
      title: "The Legend Continues",
      summary: "A mysterious tale of time travel and lost civilizations.",
    },
    {
      id: 1,
      title: "The Adventure Begins",
      summary: "An exciting journey starts in the heart of the ancient woods.",
    },
    {
      id: 2,
      title: "Lost in Time",
      summary: "A mysterious tale of time travel and lost civilizations.",
    },
    {
      id: 3,
      title: "The Last Stand",
      summary:
        "Heroes face their toughest challenge yet in a battle to save the world.",
    },
    {
      id: 4,
      title: "The Legend Continues",
      summary: "A mysterious tale of time travel and lost civilizations.",
    },
    {
      id: 5,
      title: "The Legend Continues",
      summary: "A mysterious tale of time travel and lost civilizations.",
    },
    {
      id: 6,
      title: "The Legend Continues",
      summary: "A mysterious tale of time travel and lost civilizations.",
    },
  ]);

  return (
    <Grid container spacing={4} style={{ padding: "24px" }}>
      {stories.map((story) => (
        <Grid item xs={12} sm={6} md={4} key={story.id}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {story.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {story.summary}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Gallery;
