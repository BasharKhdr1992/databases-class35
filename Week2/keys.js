const {execQuery, connection} = require('./utils');

const create_authors = `CREATE TABLE IF NOT EXISTS authors (
	author_id INT NOT NULL AUTO_INCREMENT,
  author_name VARCHAR(50) NOT NULL,
  university VARCHAR(50) NOT NULL,
  date_of_birth DATE,
  h_index DOUBLE(5,1) NOT NULL DEFAULT 0.0,
  gender ENUM('male', 'female') NOT NULL,
  PRIMARY KEY (author_id))`;

const add_mentor = `ALTER TABLE authors ADD COLUMN mentor int;`;

const add_fk_constraint = `ALTER TABLE authors
  ADD CONSTRAINT FK_author FOREIGN KEY (mentor)
  REFERENCES authors(author_id);`;

create_tables_and_constraints();

async function create_tables_and_constraints() {

  try {

    await execQuery(create_authors);
    console.log('Table authors created successfully!');
    await execQuery(add_mentor);
    console.log('Column mentor added successfully!');
    await execQuery(add_fk_constraint);
    console.log('Foreign key constraint added successfully!');

    connection.end();
  } catch(err) {
    console.error(err);
    connection.end();
  }
}