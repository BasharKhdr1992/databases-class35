const mysql = require('mysql');
const prompt = require('prompt');

const connection = mysql.createConnection({
  host: 'localhost',
  user:'hyfuser',
  password: 'P@ssw0rd',
  database: 'world',
  multipleStatements: true
});

prompt.start();

prompt.get(['name', 'code'], (err, result) => {
  if(err) {
    console.error(err);
  } else {
    // getPopulation('Country', roo' OR '1=1, oor' OR '1=1);
    getPopulationSafe('Country', result.name, result.code);
  }
});

function getPopulationSafe(Country, name, code){
  const query = `select Population from ${Country} where name= ? and code= ?`
  console.log(query);
  connection.query(
    query, [name, code]
  , (err, result) => {
    if (err) {
      console.error(err.message);
      connection.end();
    }else if (result.length == 0) {
      console.log('Not found');
      connection.end();
    }else {
      console.log(result);
      connection.end();
    }
  });
}

// Not safe
function getPopulation(Country, name, code) {

  const query = `select Population from ${Country} where name= '${name}' and code='${code}'`
  console.log(query);
  connection.query(
    query
  , (err, result) => {
    if (err) {
      console.error(err.message);
      connection.end();
    }else if (result.length == 0) {
      console.log('Not found');
      connection.end();
    }else {
      console.log(result);
      connection.end();
    }
  });
}