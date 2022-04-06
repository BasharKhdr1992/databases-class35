const {
  readFile,
  execQuery,
  connection
} = require('../utils');

insertData();

async function insertData() {
  try {
    data = await readFile(__dirname + '/Data/authors.json');
    authors = JSON.parse(data);

    const promises = authors.map(author => {
      execQuery('INSERT INTO authors SET ?', author);
    });
    await Promise.all(promises);
    connection.end();

  }catch(err){
    console.error(err);
    connection.end();
  }
}