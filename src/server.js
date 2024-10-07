const express = require("express");
const bodyParser = require("body-parser");
const morganBody = require("morgan-body");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const log = fs.createWriteStream(
  path.join(
    __dirname,
    "./logs",
    `express-${moment().format("YYYY-MM-DD")}.log`
  ),
  {
    flags: "a",
  }
);

morganBody(app, {
  noColors: true,
  stream: log,
});

app.get("/", (request, response) => {
  response.send("Hello world!");
});

app.post("/testpost", (request, response) => {
  response.send("Log save in log file!");
});

app.post("/testerror", (request, response) => {
  response.error("Error in application!"); //response.error is not a function. This Fn exists only to test.
});

app.listen(port, () => console.log(`Server in running on port ${port}`));
