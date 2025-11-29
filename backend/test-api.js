const axios = require("axios");

async function testChatAPI() {
  try {
    console.log("Testing Chat API...");
    const response = await axios.post("http://localhost:4000/api/chat", {
      message: "Hello, how are you?",
    });
    console.log("✅ API Response:", response.data);
  } catch (error) {
    console.error("❌ API Error:", error.message);
    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);
    }
  }
}

testChatAPI();
