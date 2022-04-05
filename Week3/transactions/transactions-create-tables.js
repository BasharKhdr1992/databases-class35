const {connection, execQuery} = require('./constants');

createTables();

async function createTables() {
  const create_account_table_query = 'CREATE TABLE `account` (\
    account_number int primary key,\
    balance float(15,2) default 0.00\
  )';

  const create_account_changes_query = 'CREATE TABLE `account_changes`(\
    change_number int,\
    account_number int,\
    amount float(15,2),\
    change_date timestamp default now(),\
    remark varchar(500),\
    primary key (change_number, account_number),\
    foreign key (account_number) references account(account_number)\
  )';

  try {
    await execQuery('DROP TABLE IF EXISTS `account_changes`;')
    await execQuery('DROP TABLE IF EXISTS `account`;');
    await execQuery(create_account_table_query);
    await execQuery(create_account_changes_query);
    console.log(`Tables account, account_changes created successfully!`);
    connection.end();
  }catch(err) {
    console.log(err.message);
    connection.end();
  }
}