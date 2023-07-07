// require("dotenv").config({ path: "../.env" });
const callSendAPI = require("../sendMessage/callSendAPI");

// const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const welcomeUser = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      //send a quick reply
      const Welcome = {
        text: "Welcome to AZtechmart! I am AZtechbot 🤖 How can I help you today?",
        quick_replies: [
          {
            content_type: "text",
            title: "Sell Device",
            payload: "SELL",
          },
          {
            content_type: "text",
            title: "Buy Device",
            payload: "BUY",
          },
          {
            content_type: "text",
            title: "Talk to a person",
            payload: "PERSON",
          },
        ],
      };

      await callSendAPI(sender_psid, Welcome);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = welcomeUser;

// welcomeUser("6143614182425714");
