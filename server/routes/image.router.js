const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const axios = require("axios");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * GET route template
 */
router.get("/", async (req, res) => {
  try {
    const queryText = "SELECT * FROM images"; // sample query
    const dbRes = await pool.query(queryText);
    res.json(dbRes.rows);
  } catch (err) {
    console.error("Error completing SELECT images query", err);
    res.sendStatus(500);
  }
});

//*POST route to generate an image using OpenAI's DALL-E and upload to Cloudinary
router.post("/generate", async (req, res) => {
  console.log("Received request for image generation:", req.body);

  const { prompt, userId, storyId } = req.body;

  // Prepare the request body for the OpenAI API call
  console.log("Making OpenAI API call for image with prompt:", prompt);
  const openAiRequestBody = {
    prompt: prompt,
    n: 1,
    response_format: "url",
    size: "1024x1024",
  };
  // style: "natural"

  try {
    const openAiImageResponse = await axios.post(
      "https://api.openai.com/v1/images/generations",
      openAiRequestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log(
      "OpenAI Image Generation API Response:",
      openAiImageResponse.data
    );
    const generatedImageUrl = openAiImageResponse.data.data[0].url;
    console.log("Generated Image URL:", generatedImageUrl);

    console.log("Uploading generated image to Cloudinary");
    const cloudinaryUploadResponse = await cloudinary.uploader.upload(
      generatedImageUrl,
      {
        folder: "generated_images",
      }
    );
    console.log("Cloudinary Upload Response:", cloudinaryUploadResponse);

    const cloudinaryUrl = cloudinaryUploadResponse.secure_url;
    console.log("Cloudinary Image URL:", cloudinaryUrl);

    console.log("Inserting image data into database");
    const insertQuery = `
      INSERT INTO images (url, caption, storyid)
      VALUES ($1, $2, $3)
      RETURNING *;`;
    // Adjust the values array to match your table's expected data
    const dbResponse = await pool.query(insertQuery, [
      cloudinaryUrl,
      prompt,
      storyId || null,
    ]);
    console.log("Database Insertion Response:", dbResponse.rows[0]);

    res.json(dbResponse.rows[0]);
  } catch (error) {
    console.error("Error in /generate route for image:", error);
    res.status(500).send("Failed to generate or save image");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { caption } = req.body; // ? update the caption
  const queryText = `
    UPDATE images
    SET caption = $1
    WHERE id = $2
    RETURNING *;`;
  try {
    const dbRes = await pool.query(queryText, [caption, id]);
    if (dbRes.rows.length > 0) {
      res.json(dbRes.rows[0]);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (err) {
    console.error("Error completing UPDATE image query", err);
    res.sendStatus(500);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const queryText = `
    DELETE FROM images
    WHERE id = $1
    RETURNING *;`; // Returning the deleted row can be helpful for confirmation
  try {
    const dbRes = await pool.query(queryText, [id]);
    if (dbRes.rows.length > 0) {
      res.json(dbRes.rows[0]);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (err) {
    console.error("Error completing DELETE image query", err);
    res.sendStatus(500);
  }
});

module.exports = router;
