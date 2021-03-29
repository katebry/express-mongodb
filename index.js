const express = require("express");
const dotenv = require("dotenv").config();
const { dbConnect, findAllBooks, findOneBookByName } = require("./db/connections");

const MY_PORT = process.env.PORT;

const app = express();

app.get("/", function (req, res) {
  console.log(req.body);
  res.json({
    status: "API Works",
    message: "First API Res",
  });
});

app.get("/books", function (req, res) {
  dbConnect(findAllBooks).catch(console.error);
  console.log(req.body, ": /books request");
  res.json({
    status: "200",
    message: "GET allBooks",
  });
});

app.get(`/books/:title`, function (req, res) {
  const { title } = req.params;
  dbConnect(findOneBookByName, title).catch(console.error);
  console.log(req.body, ": /books/:title request");
  res.json({
    status: "200",
    message: "GET bookByTitle",
  });
});

app.post("/addBook", function (req, res) {
  console.log(req.body, ": /addBook request");
  res.json({
    status: "201",
    message: "POST addBook",
  });
});

app.listen(MY_PORT, function () {
  console.log("Running Express Server on port: " + MY_PORT);
});
