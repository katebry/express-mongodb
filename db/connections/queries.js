const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();

const MY_DB_PASSWORD = process.env.MONOGO_PASSWORD;

// List the dbs available in your mongoDb client
export async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  }

// Connect to the db, passing the type of REST request in
export async function dbConnect(request) {
  const client = new MongoClient(MY_DB_PASSWORD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    await listDatabases(client, ': available dbs');
    await request(client)
    // await findOneBookByName(client, "The Divine Comedy");
    // await findAllBooks(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// Search for individual book, GET request
export async function findOneBookByName(client, nameOfBook) {
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

// Search for all books, GET request
export async function findAllBooks(client) {
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
    console.log('No books found');
  }
}
