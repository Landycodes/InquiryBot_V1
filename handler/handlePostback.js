const welcomeUser = require("./responses/welcomeUser");
const callSendAPI = require("./sendMessage/callSendAPI");
require("dotenv").config({ path: "../.env" });

// Handles messaging_postbacks events
async function handlePostback(senderPsid, receivedPostback) {
  console.log("----Running handlePostback()----");

  // let response;

  // Get the payload for the postback
  let payload = receivedPostback.payload;
  console.log(`payload = ${payload}`);

  // Set the response based on the postback payload
  switch (payload) {
    case "GET_STARTED":
      await welcomeUser(senderPsid);
      break;
    default:
      console.log("Unknown Payload");
  }
  //   if (payload === "GET_STARTED") {
  //     welcomeUser(senderPsid);
  //     return;
  //   } else if (payload === "no") {
  //     response = { text: "Oops, try sending another image." };
  //   } else {
  //     response = { text: "Unknown Payload" };
  //   }
  //   // Send the message to acknowledge the postback
  //   console.log("calling callsendAPI function");
  //   return await callSendAPI(senderPsid, response);
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
