const {execQuery, connection, readFile} = require('./constants');

seedDatabase();

async function seedDatabase() {

  try {

    const accounts = JSON.parse(
      await readFile(`${__dirname}/Data/accounts.json`)
    );

    const account_changes = JSON.parse(
      await readFile(`${__dirname}/Data/account_changes.json`)
    );

   const accounts_promises = accounts.map(account =>
    execQuery('INSERT INTO account SET ?', account)
  );

    await Promise.all(accounts_promises);

    const account_changes_promises = account_changes.map(account_change =>
      execQuery('INSERT INTO account_changes SET ?', account_change)
    );

    await Promise.all(account_changes_promises);

    connection.end();

  } catch(err) {
    console.log(err.message);
    connection.end();
  }
}