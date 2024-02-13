const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const { log } = require("console");
const axios = require("axios");

// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// // !!!! temp post route
// // !!!! temp post route
// router.post("/", (req, res) => {
//   const { title, content, userid } = req.body; // Ensure you're receiving userid correctly, either from req.body or req.user depending on your auth setup
//   const queryText =
//     "INSERT INTO stories (title, content, userid) VALUES ($1, $2, $3) RETURNING id;";
//   pool
//     .query(queryText, [title, content, userid])
//     .then((result) => res.status(201).json(result.rows[0])) // Send back the inserted story's ID
//     .catch((err) => {
//       console.error("Error adding new story", err);
//       res.sendStatus(500);
//     });
// });

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
  const { prompt, userId } = req.body; // Destructure to extract userId
  // Log individual values to ensure they are extracted correctly
  console.log("Received payload:", req.body); // Log to verify structure
  console.log("Prompt:", prompt);
  console.log("UserId:", userId);
  // Prepare the request body for the OpenAI API call
  const requestBody = {
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant. Please respond in JSON format.",
      },
      // ?confirm prompt is string and user is what we need
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

    // const data = response.data; // Parse the JSON response from OpenAI //! do i still even need this?
    const generatedContent = response.data.choices[0].message.content;
    console.log("Generated Content:", generatedContent);
    // Insert the generated content into the "stories" table
    const insertQuery = `
      INSERT INTO "stories" (title, content, userid, createddate, lastupdateddate)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *;`;
      // ? confirm the values are correct
    const values = ["Generated Story", generatedContent, userId];
 
    // Using your existing pool to query your PostgreSQL database
    const dbResponse = await pool.query(insertQuery, values);
    const newStory = dbResponse.rows[0]; // The newly inserted story
    console.log("Insert Query:", insertQuery);
    console.log("DB Insertion Response:", dbResponse.rows[0]);

    // Respond to the client with the new story details
    res.json({ success: true, story: dbResponse.rows[0] });
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

// Simplify to Debug: Temporarily simplify your route to isolate the issue.
// Try just configuring the OpenAI client and logging it, without making an API call: -
// router.post("/generate", async (req, res) => {
//   console.log("OpenAI Configuration:", configuration);
//   res.json({ message: "Test successful" });
// });

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
