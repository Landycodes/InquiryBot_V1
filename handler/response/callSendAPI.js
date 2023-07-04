const request = require("request");
require("dotenv").config({ path: "../../.env" });

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
        message: response,
      };
      console.log("-------callSendAPI Request body-------");
      console.log(requestBody);

      // Send the HTTP request to the Messenger Platform
      console.log("sending request... 🤓");

      request(
        {
          uri: "https://graph.facebook.com/v16.0/me/messages",
          qs: { access_token: PAGE_ACCESS_TOKEN },
          method: "POST",
          json: requestBody,
        },
        (err, _res, _body) => {
          console.log("request sent... 🙏");
          if (!err && !_body.error) {
            console.log("Success!!! 🎉");
            resolve("Message sent!");
          } else if (_body === undefined) {
            console.log("Didnt get a response object 😕");
            reject(err);
          } else {
            console.log("something fucked up 🤬");
            console.log(_body);
            console.log("😡 🤬 😤 😖");
            reject("Unable to send message:" + err);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
}

// callSendAPI("6143614182425714", {
//   text: "Hello, world!",
// });
module.exports = callSendAPI;
