const welcomeUser = require("./responses/welcomeUser");
// const callSendAPI = require("./API/sendMessage");
const persistent_menu = require("./API/persistentMenu");
const introduce_conversation = require("./responses/introduceConvo");
require("dotenv").config({ path: "../.env" });

// Handles messaging_postbacks events
async function handlePostback(senderPsid, receivedPostback) {
  console.log("----Running handlePostback()----");

  // Get the payload for the postback
  let payload = receivedPostback.payload;
  console.log(`payload = ${payload}`);

  // Set the response based on the postback payload
  switch (payload) {
    case "GET_STARTED":
      await Promise.all([
        persistent_menu(senderPsid, true),
        welcomeUser(senderPsid),
      ]);
      break;
    case "PERSON":
      await Promise.all([
        introduce_conversation(senderPsid),
        persistent_menu(senderPsid, false),
      ]);
      break;
    default:
      console.log("Unknown Payload");
  }
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
