/* eslint-disable no-restricted-globals */
import accounts from '../db/accounts';
import db from '../db/index';

const isValidTransactions = async (request, response, next) => {
  const { amount } = request.body;
  const bal = await db.query(
    `SELECT * FROM accounts WHERE balance = ${amount}`,
  );
  console.log(bal.rows);
  // if (amount > bal) {
  //   return response.status(400).json({
  //     status: 400,
  //     error: 'insuffff',
  //   });
  // }

  next();
};

export default isValidTransactions;
