const callSendAPI = require("./response/callSendAPI");

// Handles messaging_postbacks events
function handlePostback(senderPsid, receivedPostback) {
  let response;

  // Get the payload for the postback
  let title = receivedPostback.title;

  // Set the response based on the postback payload
  if (title === "Get Started") {
    response = {
      text: "Welcome to AZtechmart! I am AZtechbot 🤖 How can i help you today?",
    };
  } else if (title === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  callSendAPI(senderPsid, response);
}

module.exports = handlePostback;
