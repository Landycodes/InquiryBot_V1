const router = require("express").Router();
const webhookRoutes = require("./webhook");

router.use("/webhook", webhookRoutes);

module.exports = router;
