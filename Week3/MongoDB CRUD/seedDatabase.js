const csvtojson = require('csvtojson');
const mongoClient = require('mongodb').MongoClient;

const mongo_url = 'mongodb://localhost:27017';

const countryCsvPath = `${__dirname}/data/country.csv`;
const cityCsvPath = `${__dirname}/data/city.csv`;
const countrylanguageCsvPath = `${__dirname}/data/countrylanguage.csv`;

seedDatabase();

async function seedDatabase() {

  const client = new mongoClient(mongo_url);

  try{

    await client.connect();
    console.log("connected to mongo instance")
    const countries = await csvtojson({
      trim: true,
      noheader: true,
      headers:['Code', 'Name', 'Continent', 'Region',
      'SurfaceArea', 'IndepYear', 'Population', 'LifeExpectancy',
      'GNP', 'GNPOld', 'LocalName', 'GovernmentForm',
      'HeadOfstate', 'Capital', 'Code2'],
      colParser:{
        SurfaceArea: 'number',
        IndepYear:'number',
        Population:'number',
        LifeExpectancy:'number',
        GNP:'number',
        GNPOld:'number',
        Capital:'number'
      },
    }).fromFile(countryCsvPath);

    const cities = await csvtojson({
      trim: true,
      noheader: true,
      headers:[
        'ID', 'Name', 'CountryCode', 'District', 'Population'
      ],
      colParser:{
        ID: 'number',
        Population:'number'
      },
    }).fromFile(cityCsvPath);

    const countrylanguage = await csvtojson({
      trim: true,
      noheader: true,
      headers:[
        'CountryCode', 'Language', 'IsOfficial', 'percentage'
      ],
      colParser:{
        Percentage:'number'
      },
    }).fromFile(countrylanguageCsvPath);

    // insert countries
    await client
      .db("world")
      .collection("Country")
      .insertMany(countries);

    // insert cities
    await client
      .db("world")
      .collection("City")
      .insertMany(cities);

    // insert countrylanguage
    await client
      .db("world")
      .collection("countrylanguage")
      .insertMany(countrylanguage);

  } catch(err) {
    console.log(err);
  } finally {
    await client.close();
  }
}