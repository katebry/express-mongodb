const express = require("express");
const dotenv = require("dotenv").config();
const { listDatabases, findOneBookByName, findAllBooks } = require("./db/connections");

const MY_DB_PASSWORD = process.env.MONOGO_PASSWORD;
const MY_PORT = process.env.PORT;

const app = express();

const { MongoClient } = require("mongodb");

async function main() {
  const client = new MongoClient(MY_DB_PASSWORD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    await listDatabases(client);
    await findOneBookByName(client, "The Divine Comedy");
    await findAllBooks(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// TODO, move these back into the Router file
app.get("/", function (req, res) {
  console.log(req.body);
  res.json({
    status: "API Works",
    message: "First API Res",
  });
});

app.get("/books", function (req, res) {
  console.log(req.body, ": /books request");
  res.json({
    status: "200",
    message: "GET allBooks",
  });
});

app.get(`/books/:title`, function (req, res) {
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
