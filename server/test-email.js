const axios = require("axios");

const API_URL = "http://localhost:5000/api";

// Replace this with your email address
const YOUR_EMAIL = "c98581097@gmail.com";

async function testEmailSending() {
  try {
    console.log("\n📧 Testing Email Sending...");

    // Step 1: Add you as a recipient
    console.log("\n1️⃣ Adding your email as recipient");
    const addResponse = await axios.post(`${API_URL}/recipients`, {
      email: YOUR_EMAIL,
      name: "Test User",
      active: true,
    });
    console.log("✅ Added recipient:", addResponse.data);

    // Step 2: Send test email
    console.log("\n2️⃣ Sending test email");
    const emailResponse = await axios.post(`${API_URL}/test/send-email`);
    console.log("✅ Email processing result:", emailResponse.data);

    // Step 3: Get email logs
    console.log("\n3️⃣ Checking email logs");
    const logsResponse = await axios.get(`${API_URL}/logs`);
    console.log("✅ Email logs:", logsResponse.data);

    // Cleanup
    console.log("\n🧹 Cleaning up test data");
    await axios.delete(`${API_URL}/recipients/${addResponse.data._id}`);
    console.log("✅ Cleanup complete");

    console.log("\n✨ Test completed! Check your email inbox.");
  } catch (error) {
    console.error("\n❌ Test failed:", error.response?.data || error.message);
  }
}

testEmailSending();
