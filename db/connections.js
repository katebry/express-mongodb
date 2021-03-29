async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
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

// Search for all books, GET request
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

module.exports = { listDatabases, findOneBookByName, findAllBooks };
