/**
 * Image Management Routes for Cloud-Based Storytelling Application
 *
 * This module defines the Express routes for managing image resources, including fetching, generating, updating, and deleting images.
 * It utilizes PostgreSQL for data persistence, Axios for HTTP requests, and integrates with Cloudinary for image hosting.
 * 
 * Key Features:
 * - Fetch images from the database by ID or story ID.
 * - Generate new images using OpenAI's DALL-E model, upload them to Cloudinary, and save the reference in the database.
 * - Update image captions.
 * - Delete images from the database and optionally from Cloudinary (consider implementing).
 *
 * Environment Variables:
 * - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET for Cloudinary configuration.
 * - OPENAI_API_KEY for authenticating requests to OpenAI's API.
 *
 * Endpoints:
 * - GET /:id - Fetches a single image by its database ID.
 * - GET / - Fetches all images.
 * - GET /byStory/:storyId - Fetches all images associated with a specific story.
 * - POST /generate - Generates an image via OpenAI's DALL-E, uploads to Cloudinary, and saves in the database.
 * - PUT /:id - Updates the caption of a specific image.
 * - DELETE /:id - Deletes a specific image from the database.
 * 
 * Usage Notes:
 * - For image generation, ensure the body contains 'prompt' for the image description and optionally 'storyId' to associate the image with a story.
 * - Update and delete operations require the image ID as part of the URL path.
 * - When deleting images, consider also removing them from Cloudinary to manage storage efficiently.
 *
 * Future Enhancements:
 * - Implement more robust error handling and validation to improve reliability and user experience.
 * - Expand the functionality to include image categorization, tagging, and advanced search capabilities.
 * - Secure endpoints with authentication and authorization mechanisms to protect image resources.
 *
 * Dependencies:
 * - express for routing, axios for HTTP requests, dotenv for environment variable management, pg (via pool) for PostgreSQL interactions, cloudinary for image hosting.
 *
 */

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
// Route to fetch a single image by its ID TEMPORARY
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const queryText = 'SELECT * FROM "images" WHERE "id" = $1';
    const result = await pool.query(queryText, [id]);
    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (error) {
    console.error("Error fetching image by ID:", error);
    res.status(500).send("Server error");
  }
});

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
/**
 * GET route template
 */
// Corrected route in the image router to fetch images by story ID
router.get("/byStory/:storyId", async (req, res) => {
  const { storyId } = req.params;
  try {
    const queryText = 'SELECT * FROM "images" WHERE "storyid" = $1';
    const result = await pool.query(queryText, [storyId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching images for story:", error);
    res.status(500).send("Server error");
  }
});

//*POST route to generate an image using OpenAI's DALL-E and upload to Cloudinary
router.post("/generate", async (req, res) => {
  console.log("Received request for image generation:", req.body);

  const { prompt, storyId } = req.body;

  // Prepare the request body for the OpenAI API call
  console.log("Making OpenAI API call for image with prompt:", prompt);
  const openAiRequestBody = {
    prompt: prompt,
    model: "dall-e-3",
    n: 1,
    response_format: "url",
    size: "1024x1024",
    style: "natural",
  };

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
    //? double check these - this is not working as expected
    const dbResponse = await pool.query(insertQuery, [
      cloudinaryUrl,
      prompt,
      storyId || null,
      //? storyid is a troublemaker
    ]);
    console.log("Database Insertion Response:", dbResponse.rows[0]);

    res.json(dbResponse.rows[0]);
  } catch (error) {
    console.error("Error in /generate route for image:", error);
    res.status(500).send("Failed to generate or save image");
  }
});
// * put
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
//! delete
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
