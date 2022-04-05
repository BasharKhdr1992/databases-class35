const mongo = require('mongodb').MongoClient;

const mongo_url = "mongodb://localhost:27017";

deleteCity();

async function deleteCity() {
  const client = new mongo(mongo_url);

  try{
    await client.connect();

    const result = await client
      .db("world")
      .collection("City")
      .findOneAndDelete({Name:"Tartus"});

      console.log(result);

  } catch(err) {
    console.log(err);
  } finally{
    client.close();
  }
}