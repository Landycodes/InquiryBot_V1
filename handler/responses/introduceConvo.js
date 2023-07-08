const sendMessage = require("../API/sendMessage");

const introduce_conversation = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      //send a welcome message and a quick reply
      const introduce = {
        text: "You may now type a message and one of our members will respond to you as soon as possible! 😎",
      };

      await sendMessage(sender_psid, introduce);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = introduce_conversation;
