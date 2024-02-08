const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);
// saving files based on a .txt file counter
async function getCurrentCount() {
  try {
    const count = await fs.promises.readFile("audiocounter.txt", "utf8");
    return parseInt(count) || 0;
  } catch (error) {
    console.error("Error reading counter file:", error);
    return 0;
  }
}
// saving files based on a .txt file counter

async function incrementAndSaveCount(currentCount) {
  const newCount = currentCount + 1;
  try {
    await fs.promises.writeFile("audiocounter.txt", newCount.toString());
  } catch (error) {
    console.error("Error writing to counter file:", error);
  }
}
//Experiment with different voices (alloy, echo, fable, onyx, nova, and shimmer)
//to find one that matches your desired tone and audience.
//The current voices are optimized for English.
async function textToSpeech(text, voice = "alloy") {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: text,
    });

    const currentCount = await getCurrentCount();
    const speechFileName = `speech${currentCount + 1}.mp3`;
    const speechFilePath = path.resolve(`./${speechFileName}`);

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFilePath, buffer);

    await incrementAndSaveCount(currentCount);
    console.log("Audio file saved as", speechFileName);
  } catch (error) {
    console.error("Error generating speech:", error);
  }
}

async function main() {
  // Example usage
  await textToSpeech(
    "Welcome to CobbleStone Cafe! Where we serve the best breakfast in town.",
    "echo"
  );
}

main();
