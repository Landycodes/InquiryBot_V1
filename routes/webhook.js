const router = require("express").Router();
const { postWebhook } = require("../controller/postController");
const { getWebhook } = require("../controller/getController");

router.route("/").get(getWebhook).post(postWebhook);

module.exports = router;
