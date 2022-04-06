const {
  execQuery,
  connection
} = require('../utils');

executeQueries();

async function executeQueries() {
  try {
    const rows1 = await execQuery(`SELECT a.author_name AS author, m.author_name AS mentor
    FROM authors a
    JOIN authors m
    ON a.mentor = m.author_id;`)
    const rows2 = await execQuery(`SELECT authors.*, research_papers.paper_title
    FROM authors
    LEFT JOIN author_papers ON authors.author_id = author_papers.author_id
    LEFT JOIN research_papers ON author_papers.paper_id = research_papers.paper_id`);

    console.log('author     mentor\n');
    rows1.forEach(row => {
      console.log(row['author'] +"    "+row['mentor']+'\n');
    });

    console.log('author_name      paper_title\n');

    rows2.forEach(rows2 => {
      console.log(rows2['author_name']+'      '+rows2['paper_title']+'\n');
    });

    connection.end();

  } catch(err) {
    console.error(err.message);
    connection.end();
  }
}
