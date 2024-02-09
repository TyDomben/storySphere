const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const OpenAI = require("openai").default;
// Initialize OpenAI with your API key
const openai = new OpenAI(process.env.OPENAI_API_KEY);
// !!!! temp post route
router.post("/", (req, res) => {
  const { title, content, userid } = req.body; // Ensure you're receiving userid correctly, either from req.body or req.user depending on your auth setup
  const queryText = "INSERT INTO stories (title, content, userid) VALUES ($1, $2, $3) RETURNING id;";
  pool.query(queryText, [title, content, userid])
    .then((result) => res.status(201).json(result.rows[0])) // Send back the inserted story's ID
    .catch((err) => {
      console.error("Error adding new story", err);
      res.sendStatus(500);
    });
});

// ! Get all stories
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

// !Get a specific story
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

// !POST route template

// New POST endpoint for generating a story
router.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    // Replace 'createChatCompletion' with the appropriate method from your SDK version
    const completion = await openai.createCompletion({
      model: "text-davinci-003", // or whichever model you're using
      prompt: prompt,
      max_tokens: 50, // adjust as needed
    });
    const generatedText = completion.choices[0].text.trim();

    // Now save the generated story to the database
    const insertText = `INSERT INTO "stories" ("title", "content", "userid") VALUES ($1, $2, $3) RETURNING "id";`;
    const storyResult = await pool.query(insertText, [
      "Generated Story",
      generatedText,
      req.user.id,
    ]);
    // ?? temp POST route
    router.post("/", (req, res) => {
      const queryText =
        "INSERT INTO stories (title, content, userid) VALUES ($1, $2, $3)";
      pool
        .query(queryText, [req.body.title, req.body.content, req.user.id])
        .then(() => res.sendStatus(201))
        .catch((err) => {
          /* handle error */
        });
    });

    // Send back the ID of the new story
    res.json({ newStoryId: storyResult.rows[0].id });
  } catch (error) {
    console.error("Error generating story with OpenAI:", error);
    res.status(500).send("Failed to generate story");
  }
});

// ! put
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

// ! delete
router.delete("/:id", (req, res) => {
  const queryText = 'DELETE FROM "stories" WHERE "id" = $1;';
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in deleting the story", error);
      res.sendStatus(500);
    });
});
// ? Route to delete a story
router.delete("/:id", (req, res) => {
  const queryText = 'DELETE FROM "stories" WHERE "id" = $1 AND "userid" = $2;';
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(500));
});

module.exports = router;
