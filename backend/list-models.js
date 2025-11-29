require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  try {
    console.log("Listing available models...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const models = await genAI.listModels();
    console.log("✅ Available models:");
    models.forEach((model) => {
      console.log(`- ${model.name}`);
    });
  } catch (error) {
    console.error("❌ Error listing models:");
    console.error("Message:", error.message);
    if (error.message.includes("401") || error.message.includes("403")) {
      console.log("\n⚠️ The API key appears to be invalid or unauthorized");
      console.log("Please verify your GEMINI_API_KEY in the .env file");
    }
  }
}

listModels();
