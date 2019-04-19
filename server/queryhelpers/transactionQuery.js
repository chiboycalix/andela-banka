/* eslint-disable max-len */
import db from '../db/index';

const debit = async (transactionDetails) => {
  // get amount and transactiontype from request.body, get cashier from request.userData, get accountnumber from request.params
  const {
    transactionType, accountnumber, cashier, amount,
  } = transactionDetails;
  const createdon = new Date();
  // get the accountnumber details from the req.params
  const account = await db.query(
    `SELECT * FROM accounts WHERE accountnumber = ${accountnumber}`,
  );
  const oldbalance = account.rows[0].balance;
  const accountbalance = oldbalance - amount;

  // update the balance to be equal to the new balance after the first operation
  await db.query(
    `UPDATE accounts SET balance = $1 WHERE accountnumber = ${accountnumber}`,
    [
      accountbalance,
    ],
  );


  // insert into the the transactions table
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

const checkTransac = async (id) => {
  const check = 'SELECT * FROM transactions WHERE id = $1 LIMIT 1';
  const transId = await db.query(check, [id]).catch(error => error.message);
  if (transId.rows[0]) {
    return true;
  }
  return false;
};

export default {
  debit,
  credit,
  checkTransac,
  oneTransaction,
};
