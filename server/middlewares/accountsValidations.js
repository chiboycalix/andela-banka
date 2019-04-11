/* eslint-disable no-restricted-globals */
import accounts from '../db/accounts';

const isValidAccount = (request, response, next) => {
  const { accountNum } = request.params;
  for (let i = 0; i < accounts.length; i += 1) {
    if (isNaN(parseFloat(accountNum, 10))) {
      return response.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    }
    if (accountNum.toString().length !== 10) {
      return response.status(400).json({
        status: 400,
        error: 'account number must be a 10 digit number',
      });
    }
  }
  next();
};
export default isValidAccount;
