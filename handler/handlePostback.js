const callSendAPI = require("./response/callSendAPI");
require("dotenv").config({ path: "../.env" });

// Handles messaging_postbacks events
function handlePostback(senderPsid, receivedPostback) {
  console.log("----Running handlePostback()----");

  let response;

  // Get the payload for the postback
  let payload = receivedPostback.payload;
  console.log(`payload = ${payload}`);

  // Set the response based on the postback payload
  if (payload === "GET_STARTED") {
    response = {
      text: "Welcome to AZtechmart! I am AZtechbot 🤖 How can I help you today?",
    };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  console.log("calling callsendAPI function");
  callSendAPI(senderPsid, response);
}

// handlePostback("6143614182425714", {
//   title: "Get Started",
//   payload: "GET_STARTED",
//   mid: "m_BHt2to3PDRPh4UKR228MR9UQ4JT0nusreInPO83myKW3QnoasZ27uan28i67O1YbP4FPm3wNdxHMwXjZ7O9fQQ",
// });

// callSendAPI("6143614182425714", {
//   text: "Hello, world!",
// });
module.exports = handlePostback;
