let express = require("express");
let apiRoutes = require("./router");
const dotenv = require('dotenv').config()

const MY_DB_PASSWORD = process.env.MONOGO_PASSWORD;
const MY_PORT = process.env.PORT;

const app = express();

const { MongoClient } = require("mongodb");

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main() {
  const client = new MongoClient(MY_DB_PASSWORD);

  console.log('in the main function')

  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

app.use("/api", apiRoutes);

app.get("/", (req, res) => res.send("Kate's Express Server!"));

app.listen(MY_PORT, function () {
  console.log("Running Express Server on port: " + MY_PORT);
});
