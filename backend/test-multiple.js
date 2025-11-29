const axios = require("axios");

async function testChatAPI() {
  const testMessages = [
    "Hello",
    "How are you",
    "What is your name",
    "Tell me about Charter.ai",
    "Help me with tax reporting",
  ];

  console.log("Testing Chatbot API...\n");

  for (const message of testMessages) {
    try {
      const response = await axios.post("http://localhost:4000/api/chat", {
        message: message,
      });
      console.log(`📤 User: "${message}"`);
      console.log(`📥 Bot: "${response.data.reply}"\n`);
    } catch (error) {
      console.error(`❌ Error with message "${message}":`, error.message);
    }
  }
}

testChatAPI();
