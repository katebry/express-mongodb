let express = require("express");
const dotenv = require("dotenv").config();

const MY_PORT = process.env.PORT;

const app = express();

// main().catch(console.error);

app.listen(MY_PORT, function () {
  console.log("Running Express Server on port: " + MY_PORT);
});
