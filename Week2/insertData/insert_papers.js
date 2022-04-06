const {
  execQuery,
  connection,
  readFile
} = require('../utils');

insert_papers();

async function insert_papers() {

  try {
    const papers = JSON.parse(
      await readFile(__dirname+'/Data/papers.json')
    );

    const promises = papers.map(paper => {
      execQuery('INSERT INTO research_papers SET ?', paper);
    });

    await Promise.all(promises);
    connection.end();
  } catch(err) {
    console.error(err);
    connection.end();
  }
}