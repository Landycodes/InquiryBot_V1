const request = require("request");

// Sends response messages via the Send API
function callSendAPI(senderPsid, response) {
  // The page access token we have generated in your app settings
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  return new Promise((resolve, reject) => {
    try {
      // Construct the message body
      let requestBody = {
        recipient: {
          id: senderPsid,
        },
        messaging_type: "RESPONSE",
        message: response,
      };
      console.log(requestBody);

      // Send the HTTP request to the Messenger Platform
      request(
        {
          uri: "https://graph.facebook.com/v6.0/me/messages",
          qs: { access_token: PAGE_ACCESS_TOKEN },
          method: "POST",
          json: requestBody,
        },
        (err, _res, _body) => {
          if (!err) {
            resolve("Message sent!");
            console.log(_body);
          } else {
            reject("Unable to send message:" + err);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = callSendAPI;
