/**
 * Story Routes
 *
 * This router handles all story-related endpoints for the StorySphere application.
 * It includes CRUD operations for stories, interfacing with the PostgreSQL database
 * using the `pool` object to execute queries.
 *
 * Endpoints:
 * - GET /: Fetch all stories.
 * - GET /:id: Fetch a specific story by ID.
 * - POST /generate: Generate a new story using OpenAI's API and insert it into the database.
 * - PUT /:id: Update an existing story.
 * - PUT /:id/email: Update a user's email address for newsletter subscription.
 * - DELETE /:id: Delete a story, ensuring only authorized deletion based on user session.
 *
 * Note: All routes are designed with error handling to respond with appropriate status codes.
 */

const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const axios = require("axios");

// * Get all stories
router.get("/", (req, res) => {
  const queryText = 'SELECT * FROM "stories";';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in getting stories", error);
      res.sendStatus(500);
    });
});

// *Get a specific story
router.get("/:id", (req, res) => {
  const queryText = 'SELECT * FROM "stories" WHERE "id" = $1;';
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log("Error in getting the story", error);
      res.sendStatus(500);
    });
});

// *POST route template

router.post("/generate", async (req, res) => {
  const { prompt, userId, title } = req.body; // Destructure to extract userId
  // Log individual values to ensure they are extracted correctly
  console.log("just after deconstructure -logged");
  console.log("Received payload:", req.body); // Log to verify structure
  console.log("Prompt:", prompt);
  console.log("UserId:", userId);
  console.log("Title:", title);
  console.log("Attempting to fetch story with ID:", req.params.id);
  // Prepare the request body for the OpenAI API call
  const requestBody = {
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
    // ! I need to eventually modify this so that it is prompted specifically toward a story perspective
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant. Please respond in JSON format.",
      },
      { role: "user", content: prompt },
    ],
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Assuming the API call is successful and you have your response
    console.log("OpenAI API Response:", response.data);

    console.log("just after API response -logged");

    // Assuming response.data.choices[0].message contains the generated content
    const generatedContent = response.data.choices[0].message.content;
    // Parse the JSON string to access the story object
    const contentObject = JSON.parse(generatedContent);

    // Extract the story text
    const generatedStoryText = contentObject.story;
    console.log("Generated Content:", generatedContent);
    console.log("just after generated content -logged");

    // Insert the generated content into the "stories" table
    // const insertQuery = `
    //   INSERT INTO "stories" (title, content, userid, createddate, lastupdateddate)
    //   VALUES ($1, $2, $3, NOW(), NOW())
    //   RETURNING *;`;
    // // ? confirm the values are correct

    // const values = [title, generatedContent, userId];
    const insertQuery = `
    INSERT INTO "stories" (title, content, userid, createddate, lastupdateddate)
    VALUES ($1, $2, $3, NOW(), NOW())
    RETURNING *;
`;
    const values = [title, generatedStoryText, userId]; // Use the extracted story text here

    // Using your existing pool to query your PostgreSQL database
    const dbResponse = await pool.query(insertQuery, values);
    const newStory = dbResponse.rows[0]; // The newly inserted story
    console.log("Insert Query:", insertQuery);
    console.log("DB Insertion Response:", dbResponse.rows[0]);

    //! Respond to the client with the new story details
    res.json({ success: true, story: dbResponse.rows[0] });
    // After receiving the response from the OpenAI API
    console.log("Full API Response:", response.data);

    // To explore different paths that might contain the generated content
    console.log("First Attempt:", response.data.choices[0].message.content);
    console.log("Second Attempt:", response.data.choices[0].text);
    console.log("Third Attempt:", response.data.choices[0].content);
    console.log("Fourth Attempt:", response.data.text); // I
  } catch (error) {
    if (error.response) {
      // If the error is related to the HTTP response
      console.error("Error:", error.response.data);
      res.status(500).send("Failed to generate or save story");
    } else {
      // If the error is not related to the HTTP response
      console.error("Error:", error.message);
      res.status(500).send("An unexpected error occurred");
    }
  }
});

// * put
router.put("/:id", (req, res) => {
  const { title, content } = req.body;
  const queryText = `UPDATE "stories" SET "title" = $1, "content" = $2, "lastupdateddate" = NOW() WHERE "id" = $3;`;
  pool
    .query(queryText, [title, content, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in updating the story", error);
      res.sendStatus(500);
    });
});

// ? considering a PUT route where i just insert an email addess into the user table
// ? maybe a newletter type thing ?
router.put("/:id", (req, res) => {
  const { email } = req.body;
  const queryText = ` UPDATE "users" SET "email" = $1 WHERE "id" = $2;`;
  pool
    .query(queryText, [email, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in updating the user", error);
      res.sendStatus(500);
    });
});

// ? Route to delete a story
// * Enhanced route to ensure authorized deletion
router.delete("/:id", (req, res) => {
  const queryText = 'DELETE FROM "stories" WHERE "id" = $1 AND "userid" = $2;';
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(500));
});

module.exports = router;
