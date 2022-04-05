const mongoClient = require('mongodb').MongoClient;

const mongo_url = "mongodb://localhost:27017";

updateCity();

async function updateCity() {
  const client = new mongoClient(mongo_url);

  try {
    await client.connect();

    // update using city name
    const result = await client
      .db("world")
      .collection("City")
      .updateOne({Name:"Tartus"}, {$set: {Population: 750000}});
    console.log(result);
  } catch(err) {
    console.log(err);
  } finally{
    await client.close();
  }
}