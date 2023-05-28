const handleMessage = require("../handler/handleMessage");
const handlePostback = require("../handler/handlePostback");

module.exports = {
  postWebhook(req, res) {
    let body = req.body;
    console.log("-----------BODY-----------");
    console.log(body);
    console.log("________________________");
    console.log("------------STANDBY----------");
    console.log(body.entry.standby);
    console.log("_________________________");
    // Checks if this is an event from a page subscription
    if (body.object === "page") {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function (entry) {
        // Gets the body of the webhook event
        let webhookEvent = entry.standby[0];
        //comment out rest of post request when testing locally
        // Get the sender PSID
        let senderPsid = webhookEvent.sender.id;
        console.log("Sender PSID: " + senderPsid);
        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhookEvent.message) {
          handleMessage(senderPsid, webhookEvent.message);
          console.log("MESSAGE");
          console.log(webhookEvent.message.text);
        } else if (webhookEvent.postback) {
          handlePostback(senderPsid, webhookEvent.postback);
          console.log("POSTBACK");
          console.log(webhookEvent.postback.title);
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
