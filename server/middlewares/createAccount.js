/* eslint-disable no-restricted-globals */
const createAccount = (request, response, next) => {
  const { balance } = request.body;

  if (isNaN(parseFloat(balance, 10))) {
    return response.status(400).json({
      status: 400,
      error: 'Input a valid amount',
    });
  }
  next();
};

export default createAccount;
