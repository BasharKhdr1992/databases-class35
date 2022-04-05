const {execQuery, connection} = require('./constants');

transfer_money();

async function transfer_money() {
  try {
    await execQuery('start transaction;');
    await execQuery('UPDATE account SET balance = balance - 1000 WHERE account_number = 101;');
    await execQuery('UPDATE account SET balance = balance + 1000 WHERE account_number = 102;')
    await execQuery('INSERT INTO account_changes (\
      account_number, change_number, amount, remark\
      )\
    VALUES\
      (101, 100005, 1000, "Transfer money from account number 101 to account number 102"),\
      (102, 100005, 1000, "Transfer money from account number 101 to account number 102");');
      await execQuery('commit;');
      connection.end();
  }catch(err) {
    console.log(err);
    await execQuery('rollback;');
    connection.end();
  }
}