import db from '../db/index';
/**
 *
 *
 * @param {object} accountDetails
 * @returns
 */
const registerAccount = (accountDetails) => {
  const {
    type,
    balance,
    owner,
    firstname,
    lastname,
    email,
  } = accountDetails;
  const accountnumber = Math.floor(1000000000 + Math.random() * 9000000000);
  const createdon = new Date();
  return db.query(
    `INSERT INTO
          accounts(type, balance, accountnumber, createdon, owner, firstname, lastname, email)
      VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING*`,
    [
      type,
      balance,
      accountnumber,
      createdon,
      owner,
      firstname,
      lastname,
      email,
    ],
  ).catch(error => error.message);
};
/**
 *
 *
 * @param {object} accountDetails
 * @returns
 */
const changeAccount = (accountDetails) => {
  const { status, accountnumber } = accountDetails;
  return db.query(
    `UPDATE accounts
     SET status = $1 WHERE accountnumber = $2 RETURNING status`,
    [
      status,
      accountnumber,
    ],
  ).catch(error => error.message);
};
/**
 *
 *
 * @param {object} accountnumber
 * @returns
 */
const checkAccount = async (accountnumber) => {
  const check = 'SELECT * FROM accounts WHERE accountnumber = $1 LIMIT 1';
  const accNum = await db.query(check, [accountnumber]).catch(error => error.message);
  if (accNum.rows[0]) {
    return true;
  }
  return false;
};

/**
 *
 *
 * @param {object} accountnumber
 */
const deleleAccount = accountnumber => db.query(
  `DELETE FROM
          accounts
        WHERE accountnumber = '${accountnumber}'`,
);
/**
 *
 *
 * @param {object} accountnumber
 */
const getAllTransactions = accountnumber => db.query(
  `SELECT * FROM transactions WHERE accountnumber = ${accountnumber}`,
);

const getAllAccounts = () => db.query(
  'SELECT * FROM accounts',
).catch(error => error.message);

/**
 *
 *
 * @param {object} accountnumber
 */
const getOneAccount = accountnumber => db.query(
  `SELECT * FROM
          accounts
        WHERE accountnumber = '${accountnumber}'`,
).catch(error => error.message);

/**
 *
 *
 * @param {object} active
 */
const getActiveAccounts = active => db.query(
  `SELECT * FROM accounts WHERE status = '${active}'`,
).catch(error => error.message);

export default {
  registerAccount,
  changeAccount,
  checkAccount,
  deleleAccount,
  getAllTransactions,
  getAllAccounts,
  getOneAccount,
  getActiveAccounts,
};
