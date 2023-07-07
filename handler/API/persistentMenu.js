require("dotenv").config({ path: "../../.env" });
const axios = require("axios");

function persistent_menu(sender_psid, input) {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
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
            type: "postback",
            title: "Shop Catalog",
            payload: "STORE",
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

  axios
    .post("https://graph.facebook.com/v16.0/me/custom_user_settings", body, {
      params: { access_token: PAGE_ACCESS_TOKEN },
    })
    .then((response) => {
      console.log(`Persistant menu: ${response.data.result}`);
      console.log(`User input disabled: ${input}`);
    });
}

// persistent_menu("6143614182425714", false);
//true = user can not type
//false = user is allowed to type
module.exports = persistent_menu;
