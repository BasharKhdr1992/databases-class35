const {
  execQuery,
  connection
} = require('../utils');

executeQueries();

async function executeQueries() {

  try{

    /* Query 1 */
    const rows1 = await execQuery(`SELECT papers.paper_title,
    COUNT(author_papers.paper_id) AS no_of_authors
    FROM research_papers papers
    JOIN author_papers ON papers.paper_id = author_papers.paper_id
    GROUP BY author_papers.paper_id;`)

    /* Query 2 */
    const rows2 = await execQuery(`SELECT COUNT(author_papers.paper_id) AS sum_of_papers
    FROM authors
    JOIN author_papers
    ON authors.author_id = author_papers.author_id
    WHERE authors.gender = 'female';`)

    /* Query 3 */
    const rows3 = await execQuery(`SELECT university, AVG(h_index) AS h_index_avg
    FROM authors GROUP BY university;`)

    /* Query 4 */
    const rows4 = await execQuery(`SELECT authors.university AS university,
    COUNT(author_papers.paper_id) AS sum_of_papers
    FROM authors
    JOIN author_papers
    USING(author_id)
    GROUP BY university;`);

    /* Query 5 */
    const rows5 = await execQuery(`SELECT university, MAX(h_index) AS h_index_max,
    MIN(h_index) AS h_index_min
    FROM authors
    GROUP BY university;`)

    rows1.forEach(row => {
      console.log(row['paper_title'],'      ',row['no_of_authors']+'\n');
    });

    console.log('----------------------------------------------');

    rows2.forEach(row => {
      console.log(row['sum_of_papers']+'\n');
    });

    console.log('----------------------------------------------');

    rows3.forEach(row => {
      console.log(row['university'] + '       ' + row['h_index_avg']+'\n');
    });

    console.log('----------------------------------------------');

    rows4.forEach(row => {
      console.log(row['university'] + '       ' + row['sum_of_papers']+'\n');
    });

    console.log('----------------------------------------------');

    rows5.forEach(row => {
      console.log(row['university'] + '       ' + row['h_index_max'] + '        ' + row['h_index_min']+'\n')
    });

    connection.end();
  }catch(err) {
    console.error(err.message);
    connection.end();
  }
}