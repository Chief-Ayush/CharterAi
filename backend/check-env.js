require("dotenv").config();

console.log("Environment Variables:");
console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
console.log(
  "GEMINI_API_KEY length:",
  process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0
);
console.log(
  "First 10 chars:",
  process.env.GEMINI_API_KEY
    ? process.env.GEMINI_API_KEY.substring(0, 10)
    : "N/A"
);
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

// Try to initialize GoogleGenerativeAI
const { GoogleGenerativeAI } = require("@google/generative-ai");

try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log("✅ GoogleGenerativeAI initialized successfully");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  console.log("✅ Model obtained successfully");
} catch (error) {
  console.error("❌ Error initializing GoogleGenerativeAI:", error.message);
}
