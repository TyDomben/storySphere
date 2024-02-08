// !refrence file not used
// !refrence file not used
// !refrence file not used
// <!-- https://platform.openai.com/docs/guides/text-generation/chat-completions-api -->
const OpenAI = require("openai").default;
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const textsDirectory = "./texts/";
const counterFile = `${textsDirectory}counter.txt`;

function initializeCounter() {
  try {
    if (fs.existsSync(counterFile)) {
      const data = fs.readFileSync(counterFile, "utf8");
      return parseInt(data, 10);
    } else {
      return 1;
    }
  } catch (error) {
    console.error("Error reading the counter file:", error);
    return 1;
  }
}

let textCounter = initializeCounter();

function updateCounter() {
  try {
    fs.writeFileSync(counterFile, textCounter.toString());
  } catch (error) {
    console.error("Error writing to the counter file:", error);
  }
}

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content:
          "Tell me a story about the most wholesome animal in the world.",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const generatedText = completion.choices[0].message.content.trim();
  let textName = `text_${textCounter}`;
  textCounter++;
  updateCounter();

  fs.writeFileSync(`${textsDirectory}${textName}.txt`, generatedText);
  console.log(`Text saved as ${textName}.txt`);
}

main();
