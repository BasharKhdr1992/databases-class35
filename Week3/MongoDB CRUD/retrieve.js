const mongo = require('mongodb').MongoClient;

const mongo_url = "mongodb://localhost:27017"

retrieve();

async function retrieve() {
  const client = new mongo(mongo_url);

  try {

    await client.connect();

    const city = await client
    .db("world")
    .collection("City")
    .findOne({Name:"Tartus"});

    console.log(city);
  } catch(err) {
    console.log(err);
  } finally{
    client.close();
  }
}