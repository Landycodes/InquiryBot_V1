const callSendAPI = require("./response/callSendAPI");

// Handles messaging_postbacks events
function handlePostback(senderPsid, receivedPostback) {
  let response;

  // Get the payload for the postback
  let payload = receivedPostback.payload;

  // Set the response based on the postback payload
  if (payload === "GET_STARTED") {
    response = {
      text: "Welcome to AZtechmart! I am AZtechbot 🤖 How can I help you today?",
    };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  callSendAPI(senderPsid, response);
}

module.exports = handlePostback;
