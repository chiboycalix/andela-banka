/* eslint-disable no-restricted-globals */
const isValidAccount = (request, response, next) => {
  const { accountNum } = request.params;
  if (isNaN(parseInt(accountNum, 10))) {
    return response.status(400).json({
      status: 400,
      error: 'Bad request 23',
    });
  }
  if (accountNum.length !== 10) {
    return response.status(400).json({
      status: 400,
      error: 'account number must be a 10 digit number',
    });
  }
  next();
};
export default isValidAccount;
