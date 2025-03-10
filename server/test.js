const axios = require("axios");

const API_URL = "http://localhost:5000/api";

const testRecipients = [
  {
    email: "test1@example.com",
    name: "Test User 1",
  },
  {
    email: "test2@example.com",
    name: "Test User 2",
  },
];

let recipientIds = [];

async function runTests() {
  try {
    console.log("\n📋 Starting Backend Tests...");

    // Test 1: Add multiple recipients
    console.log("\n🧪 Testing: Add new recipients");
    for (const testRecipient of testRecipients) {
      const addResponse = await axios.post(
        `${API_URL}/recipients`,
        testRecipient
      );
      recipientIds.push(addResponse.data._id);
      console.log(`✅ Success: Added recipient ${testRecipient.email}`);
      console.log(addResponse.data);
    }

    // Test 2: Get all recipients
    console.log("\n🧪 Testing: Get all recipients");
    const getAllResponse = await axios.get(`${API_URL}/recipients`);
    console.log("✅ Success: Retrieved all recipients");
    console.log(getAllResponse.data);

    // Test 3: Update recipient
    console.log("\n🧪 Testing: Update recipient");
    const updateResponse = await axios.patch(
      `${API_URL}/recipients/${recipientIds[0]}`,
      {
        name: "Updated Test User",
        active: true,
      }
    );
    console.log("✅ Success: Updated recipient");
    console.log(updateResponse.data);

    // Test 4: Send test emails
    console.log("\n🧪 Testing: Send test emails");
    const emailResponse = await axios.post(`${API_URL}/test/send-email`);
    console.log("✅ Success: Test emails processed");
    console.log(emailResponse.data);

    // Test 5: Get email logs
    console.log("\n🧪 Testing: Get email logs");
    const logsResponse = await axios.get(`${API_URL}/logs`);
    console.log("✅ Success: Retrieved email logs");
    console.log(logsResponse.data);

    // Test 6: Get recipient-specific logs
    console.log("\n🧪 Testing: Get recipient-specific logs");
    const recipientLogsResponse = await axios.get(
      `${API_URL}/logs/recipient/${recipientIds[0]}`
    );
    console.log("✅ Success: Retrieved recipient logs");
    console.log(recipientLogsResponse.data);

    // Cleanup: Delete test recipients
    console.log("\n🧪 Testing: Delete recipients");
    for (const recipientId of recipientIds) {
      const deleteResponse = await axios.delete(
        `${API_URL}/recipients/${recipientId}`
      );
      console.log(`✅ Success: Deleted recipient ${recipientId}`);
      console.log(deleteResponse.data);
    }

    console.log("\n✨ All tests completed successfully!");
  } catch (error) {
    console.error("\n❌ Test failed:", error.response?.data || error.message);
    console.error("\nFull error:", error);
  }
}

// Install axios if not present
if (!require("axios")) {
  console.log("Installing axios...");
  require("child_process").execSync("npm install axios");
}

runTests();
