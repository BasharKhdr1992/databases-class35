const mysql = require('mysql');
const util = require('util');
const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'P@ssw0rd',
  database: 'bank',
  multipleStatements: true
});

const execQuery = util.promisify(connection.query.bind(connection));

const readFile = util.promisify(fs.readFile);

module.exports = {execQuery, connection, readFile};