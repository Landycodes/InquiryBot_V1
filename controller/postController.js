const handleMessage = require("../handler/handleMessage");
const handlePostback = require("../handler/handlePostback");

module.exports = {
  postWebhook(req, res) {
    let body = req.body;
    console.log("-----------BODY-----------");
    console.log(body);
    console.log("________________________");

    // Checks if this is an event from a page subscription
    if (body.object === "page") {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach((entry) => {
        // Gets the body of the webhook event
        let webhookEvent;
        if (entry.messaging) {
          webhookEvent = entry.messaging[0];
          console.log("------------MESSAGING----------");
        } else if (entry.standby) {
          webhookEvent = entry.standby[0];
          console.log("------------STANDBY----------");
        }
        console.log(webhookEvent);
        console.log("_________________________");
        //comment out rest of post request when testing locally
        // Get the sender PSID
        let senderPsid = webhookEvent.sender.id;
        console.log("Sender PSID: " + senderPsid);
        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhookEvent.message) {
          console.log("MESSAGE");
          console.log(webhookEvent.message.text);
          handleMessage(senderPsid, webhookEvent.message);
        } else if (webhookEvent.postback) {
          console.log("POSTBACK");
          console.log(webhookEvent.postback.payload);
          handlePostback(senderPsid, webhookEvent.postback);
        }
      });

      // Returns a '200 OK' response to all requests
      res.status(200).send("EVENT_RECEIVED");
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  },
};

// handlePostback("6143614182425714", {
//   title: "Get Started",
//   payload: "GET_STARTED",
//   mid: "m_BHt2to3PDRPh4UKR228MR9UQ4JT0nusreInPO83myKW3QnoasZ27uan28i67O1YbP4FPm3wNdxHMwXjZ7O9fQQ",
// });
