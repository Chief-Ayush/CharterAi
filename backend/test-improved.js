const axios = require("axios");

async function testChatAPI() {
  const testMessages = [
    "hi",
    "how can you help me",
    "I need help with invoices",
    "tell me about cashflow",
    "how do I manage my business finances",
    "what about tax compliance",
    "I need financial automation",
    "How do I track my invoices",
    "goodbye",
  ];

  console.log("🤖 Improved Chatbot Response Test\n");
  console.log("=".repeat(70) + "\n");

  for (const message of testMessages) {
    try {
      const response = await axios.post("http://localhost:4000/api/chat", {
        message: message,
      });
      console.log(`📤 User: "${message}"`);
      console.log(`📥 Bot: "${response.data.reply}"`);
      console.log("-".repeat(70) + "\n");
    } catch (error) {
      console.error(`❌ Error with message "${message}":`, error.message);
    }
  }
}

testChatAPI();
