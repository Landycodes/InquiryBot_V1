const request = require("request");
const axios = require("axios");

require("dotenv").config({ path: "../../.env" });

// Sends response messages via the Send API
function sendMessage(senderPsid, response) {
  // The page access token we have generated in your app settings
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  return new Promise(async (resolve, reject) => {
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

      await axios
        .post("https://graph.facebook.com/v16.0/me/messages", requestBody, {
          params: { access_token: PAGE_ACCESS_TOKEN },
        })
        .then((response) => {
          console.log("request sent... 🙏");
          console.log("Success!!! 🎉");
          resolve(response.statusText);
        })
        .catch((error) => {
          console.log("something fucked up 🤬");
          console.log(error.response.data);
          console.log(requestBody.message);
          console.log("😡 🤬 😤 😖");
          reject("Unable to send message: " + error);
        });
      return;

      // request(
      //   {
      //     uri: "https://graph.facebook.com/v16.0/me/messages",
      //     qs: { access_token: PAGE_ACCESS_TOKEN },
      //     method: "POST",
      //     json: requestBody,
      //   },
      //   (err, _res, _body) => {
      //     console.log("request sent... 🙏");
      //     if (!err) {
      //       console.log("Success!!! 🎉");
      //       resolve(requestBody.message);
      //     } else if (_body === undefined) {
      //       console.log("Didnt get a response object 😕");
      //       reject(err);
      //     } else {
      //       console.log("something fucked up 🤬");
      //       console.log(_body);
      //       console.log(requestBody.message);
      //       console.log("😡 🤬 😤 😖");
      //       reject("Unable to send message: " + err);
      //     }
      //   }
      // );
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

// callSendAPI("6143614182425714", {
//   text: "Hello, world!",
// });
module.exports = sendMessage;
