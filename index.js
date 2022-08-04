const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./helpers/logger");

//const fs = require("fs");
//const path = require("path");

const app = express();
const PORT = 8000;

var BBWEBHOOK_RECEIVE_ENDPOINT = "/webhooks";
app.use(bodyParser.json());

app.get(["/"], function (req, res) {
  const { url } = req;
  const csse = process.env.CODESANDBOX_SSE;

  console.log("Receive get webhook request: Full URL: %s - %s", url, csse);
  res.send({
    message: "Received GET request. Check the console for more info",
  });
});

app.get([BBWEBHOOK_RECEIVE_ENDPOINT], function (req, res) {
  const { url } = req;
  console.log("Receive get webhook request: Full URL: %s", url);
  res.send({
    message: "Received GET request. Check the console for more info",
  });
});

app.post(BBWEBHOOK_RECEIVE_ENDPOINT, (req, res) => {
  const { body, url, method, headers } = req;

  //The event key of the event that triggers the webhook (for example, repo:push or pullrequest:approved).
  const eventKey = headers.get("x-event-key");
  //The UUID of the webhook that an event triggers. For details about the UUID of a webhook, see the webhook Resource.
  const hookUUID = headers.get("x-hook-uuid");
  //X-Request-UUID The UUID of the request.
  const requestUUID = headers.get("x-request-uuid");
  // The number of times Bitbucket attempts to send the payload. After the first request, Bitbucket tries
  // to send the payload two more times if the previous attempts fail.
  const requestUUID = headers.get("x-attempt-number");

  console.log("POST Received webhook request to /webhook-receive");
  console.log("Request Headers: %s", headers);
  console.log("Request Method: %s", method);
  console.log("Request body: %s", body);
  const json = JSON.stringify(body);
  logger.log({ level: "info", message: json });

  res.send({
    message: "Received POST request. Check the console for more info",
  });
});

app.listen(PORT, function (err) {
  if (err) {
    logger.log(err);
  } else {
    console.log(
      `Gravity webhook example server listening at http://localhost:${PORT}`
    );
    // open(`http://localhost:${port}`)
  }
});
