import db from '../db/index';
/**
 *
 *
 * @param {*} transactionDetails
 * @returns
 */
const debit = async (transactionDetails) => {
  const {
    transactionType, accountnumber, cashier, amount,
  } = transactionDetails;
  const createdon = new Date();
  const account = await db.query(
    `SELECT * FROM accounts WHERE accountnumber = ${accountnumber}`,
  );
  const oldbalance = account.rows[0].balance;
  const accountbalance = oldbalance - amount;

  await db.query(
    `UPDATE accounts SET balance = $1 WHERE accountnumber = ${accountnumber}`,
    [
      accountbalance,
    ],
  );


  return db.query(
    `INSERT INTO
          transactions(createdon, type, accountnumber, cashier, amount, oldbalance, newbalance)
      VALUES
          ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, accountnumber, amount, cashier, type, newbalance`,
    [
      createdon,
      transactionType,
      accountnumber,
      cashier,
      amount,
      oldbalance,
      accountbalance,
    ],
  ).catch(error => error.message);
};
/**
 *
 *
 * @param {*} transactionDetails
 * @returns
 */
const credit = async (transactionDetails) => {
  const {
    transactionType, accountnumber, cashier, amount,
  } = transactionDetails;
  const createdon = new Date();
  const account = await db.query(
    `SELECT * FROM accounts WHERE accountnumber = ${accountnumber}`,
  );
  const oldbalance = account.rows[0].balance;
  const accountbalance = oldbalance + amount;

  await db.query(
    `UPDATE accounts SET balance = $1 WHERE accountnumber = ${accountnumber}`,
    [
      accountbalance,
    ],
  );
  return db.query(
    `INSERT INTO
          transactions(createdon, type, accountnumber, cashier, amount, oldbalance, newbalance)
      VALUES
          ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, accountnumber, amount, cashier, type, newbalance`,
    [
      createdon,
      transactionType,
      accountnumber,
      cashier,
      amount,
      oldbalance,
      accountbalance,
    ],
  ).catch(error => error.message);
};
const oneTransaction = id => db.query(
  `SELECT * FROM transactions WHERE id = ${id}`,
);
/**
 *
 *
 * @param {*} id
 * @returns
 */
const checkTransaction = async (id) => {
  const check = 'SELECT * FROM transactions WHERE id = $1 LIMIT 1';
  const transId = await db.query(check, [id]).catch(error => error.message);
  if (transId.rows[0]) {
    return true;
  }
  return false;
};
/**
 *
 *
 * @param {*} accountnumber
 * @returns
 */
const checkAccountNumber = async (accountnumber) => {
  const check = 'SELECT * FROM accounts WHERE accountnumber = $1 LIMIT 1';
  const accNum = await db.query(check, [accountnumber]).catch(error => error.message);
  if (accNum.rows[0]) {
    return true;
  }
  return false;
};


export default {
  debit,
  credit,
  checkTransaction,
  oneTransaction,
  checkAccountNumber
};
