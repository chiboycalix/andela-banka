/* eslint-disable no-restricted-globals */
import accounts from '../db/accounts';

const isValidTransactions = (request, response, next) => {
  const { amount } = request.body;
  for (let i = 0; i < accounts.length; i += 1) {
    if (amount > accounts[i].balance) {
      return response.status(403).json({
        status: 403,
        error: 'Insufficient Balance',
      });
    }
  }
  next();
};

export default isValidTransactions;
