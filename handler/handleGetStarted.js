const request = require("request");
require("dotenv").config({ path: "../.env" });

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let handleGetStarted = () => {
  return new Promise((resolve, reject) => {
    try {
      let url = `https://graph.facebook.com/v7.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`;
      let request_body = {
        get_started: {
          payload: "GET_STARTED",
        },
        greeting: [
          {
            locale: "default",
            text: "Welcome {{user_first_name}}!",
          },
        ],
      };
      // Send the HTTP request to the Messenger Platform
      request(
        {
          uri: url,
          method: "POST",
          json: request_body,
        },
        (err, res, body) => {
          if (!err) {
            resolve("Done!");
          } else {
            reject("Unable to Get Started:" + err);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};
// handleGetStarted();
module.exports = handleGetStarted;
//you can run this file solo to set the getStarted button
//or wait for the server to run it automatically
