const {execQuery, connection} = require('./utils');

const create_research_papers_table = `CREATE TABLE IF NOT EXISTS research_papers (
	paper_id INT NOT NULL AUTO_INCREMENT,
  paper_title VARCHAR(200) NOT NULL,
  conference VARCHAR(200),
  publish_date DATE NOT NULL,
  PRIMARY KEY (paper_id));`;

const create_author_papers_table = `CREATE TABLE IF NOT EXISTS author_papers (
	  paper_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (paper_id, author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id));`;

executeQueries();

async function executeQueries() {

  try {
    await execQuery(create_research_papers_table);
    console.log('Table research_papers created successfully!');
    await execQuery(create_author_papers_table);
    console.log('Table author_papers created successfully!');

    connection.end();
  } catch(err) {
    console.error(err);
    connection.end();
  }
}