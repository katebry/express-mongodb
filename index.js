let express = require("express");
let apiRoutes = require("./router");
const dotenv = require("dotenv").config();

const MY_DB_PASSWORD = process.env.MONOGO_PASSWORD;
const MY_PORT = process.env.PORT;

const app = express();

const { MongoClient } = require("mongodb");

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function main() {
  const client = new MongoClient(MY_DB_PASSWORD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("in the main function");

  try {
    await client.connect();
    await listDatabases(client);
    // await findOneBookByName(client, "The Divine Comedy");
    await findAllBooks(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// Search for individual book, GET request
async function findOneBookByName(client, nameOfBook) {
  const result = await client
    .db("Vue-Books")
    .collection("Books")
    .findOne({ title: nameOfBook });
  if (result) {
    console.log(
      `Found a book in the collection with the name '${nameOfBook}':`
    );
    console.log(result);
  } else {
    console.log(`No books found with the name '${nameOfBook}'`);
  }
}

async function findAllBooks(client) {
  const result = await client
    .db("Vue-Books")
    .collection("Books")
    .find()
    .toArray();
  if (result) {
    const bookTitles = result.map((book) => {
      console.log(`These are the book titles, ${book.title}`);
    });
    return bookTitles;
  } else {
    console.log(`No books found with the name '${result}'`);
  }
}

main().catch(console.error);

app.use("/api", apiRoutes);

app.get("/", (req, res) => res.send("Kate's Express Server!"));

app.listen(MY_PORT, function () {
  console.log("Running Express Server on port: " + MY_PORT);
});
