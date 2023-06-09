require("dotenv").config({ path: "../../.env" });
const sendMessage = require("./sendMessage");
const axios = require("axios");

function persistent_menu(sender_psid, input) {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  return new Promise(async (resolve, reject) => {
    try {
      const body = {
        psid: sender_psid,
        persistent_menu: [
          {
            locale: "default",
            composer_input_disabled: input,
            call_to_actions: [
              {
                type: "postback",
                title: "Sell Device",
                payload: "SELL",
              },
              {
                type: "web_url",
                title: "Shop Catalog",
                url: "https://www.facebook.com/marketplace/profile/100001957543354/?ref=share_attachment",
                webview_height_ratio: "full",
              },
              {
                type: "postback",
                title: "Talk to a person",
                payload: "PERSON",
              },
            ],
          },
        ],
      };

      await axios
        .post(
          "https://graph.facebook.com/v16.0/me/custom_user_settings",
          body,
          {
            params: { access_token: PAGE_ACCESS_TOKEN },
          }
        )
        .then((response) => {
          console.log(`Persistant menu: ${response.data.result}`);
          console.log(`User input disabled: ${input}`);
          resolve(response.statusText);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });

      return;
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

// persistent_menu("6143614182425714", false);
//true = user can not type
//false = user is allowed to type
module.exports = persistent_menu;
