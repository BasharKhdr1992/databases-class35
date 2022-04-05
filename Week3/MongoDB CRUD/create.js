const mongoClient = require('mongodb').MongoClient;

const mongo_url = 'mongodb://localhost:27017';

create_new_city();

async function create_new_city() {

  const client = new mongoClient(mongo_url);
  try{

    await client.connect();
    console.log("connected to MongoDB");
    const result = await client
      .db("world")
      .collection("City")
      .insertOne({
        ID:4080,
        Name: "Tartus",
        CountryCode: "SYR",
        District: "Tartus",
        Population: 500000
      });

    console.log(result);
  } catch(err) {
    console.log(err);
  } finally {
    await client.close();
  }
}