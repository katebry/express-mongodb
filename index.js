let express = require("express");

let app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Kate's Express Server!"));

app.listen(port, function () {
  console.log("Running Express Server on port: " + port);
});
