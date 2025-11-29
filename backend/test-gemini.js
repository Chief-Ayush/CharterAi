require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGeminiAPI() {
  try {
    console.log("Initializing Gemini API...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Try different models
    const models = ["gemini-pro", "gemini-1.5-pro", "gemini-1.5-pro-latest"];

    for (const modelName of models) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });

        console.log(`Sending test message to ${modelName}...`);
        const result = await model.generateContent(
          "Hello, say something brief please"
        );

        console.log(`✅ ${modelName} API Response:`);
        console.log(result.response.text());
        return;
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message.split("\n")[0]}`);
      }
    }
  } catch (error) {
    console.error("❌ Gemini API Error:");
    console.error("Message:", error.message);
  }
}

testGeminiAPI();
