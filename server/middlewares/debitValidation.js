import db from '../db/index';

const isValidTransactions = async (request, response, next) => {
  const { amount } = request.body;
  const { accountNum } = request.params;
  const bal = await db.query(
    `SELECT * FROM accounts WHERE accountnumber = ${accountNum}`,
  );
  if (amount > bal.rows[0].balance) {
    return response.status(400).json({
      status: 400,
      error: 'Insufficient fund',
    });
  }
  next();
};

export default isValidTransactions;
