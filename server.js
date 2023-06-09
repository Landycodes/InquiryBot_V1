"use strict";

// Use dotenv to read .env vars into Node
require("dotenv").config();

// Imports dependencies and set up http server
const express = require("express"),
  { urlencoded, json } = require("body-parser"),
  app = express(),
  routes = require("./routes"),
  crypto = require("crypto"),
  handleGetStarted = require("./handler/handleGetStarted");

const PORT = process.env.PORT || 1337;

// Parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// Parse application/json
app.use(json());
app.use(routes);

// Respond with 'Inquiry Bot is live!' when a GET request is made to the homepage
app.get("/", function (_req, res) {
  res.send("Inquiry Bot is live!");
});

function verifyRequestSignature(req, res, buf) {
  console.log(req.headers);
  var signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
  } else {
    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = crypto
      .createHmac("sha256", config.appSecret)
      .update(buf)
      .digest("hex");
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

const getStarted = async (req, res) => {
  try {
    await handleGetStarted();
  } catch (err) {
    console.error(err);
  }
};

// listen for requests :)
var listener = app.listen(PORT, function () {
  getStarted();
  console.log("Your app is listening on port " + listener.address().port);
});
