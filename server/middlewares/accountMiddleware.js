import db from '../db/index';

class Middleware {
  static accountValidation(request, response, next) {
    const accountNumber = RegExp(/^\d*\.?\d+$/);
    const nonNegativeBalance = RegExp(/^\d*\.?\d+$/);
    const { accountNum } = request.params;
    const { amount } = request.body;
    if (isNaN(parseInt(accountNum, 10))) {
      return response.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    }
    if (accountNum.length !== 10) {
      return response.status(400).json({
        status: 400,
        error: 'account number must be a 10 digit number',
      });
    }
    if (!Number.isInteger(parseInt(accountNum, 10))) {
      return response.status(400).json({
        status: 400,
        error: 'Account number mmust be an Integer',
      });
    }
    if(!accountNumber.test(accountNum)) {
      return response.status(400).json({
        status:400,
        error: 'Invalid account number',
      })
    }
    if(!nonNegativeBalance.test(amount)) {
      return response.status(400).json({
        status: 400,
        error: 'negative amount not allowed',
      })
    }
    next();
  }

  static createAccountValidation(request, response, next) {
    const nonNegativeBalance = RegExp(/^\d*\.?\d+$/);
    const { balance } = request.body;
    if (isNaN(parseFloat(balance, 10))) {
      return response.status(400).json({
        status: 400,
        error: 'Input a valid amount',
      });
    }
    if(!nonNegativeBalance.test(balance)) {
      return response.status(400).json({
        status: 400,
        error: 'negative amount not allowed',
      })
    }
    next();
  }

  static async debitValidation(request, response, next) {
    const { amount } = request.body;
    const { accountNum } = request.params;
    const account = await db.query(
      `SELECT * FROM accounts WHERE accountnumber = ${accountNum}`,
    );
    if (amount > account.rows[0].balance) {
      return response.status(400).json({
        status: 400,
        error: 'Insufficient fund',
      });
    }
    next();
  }

  static async isValidId(request, response, next) {
    const { transactionsId } = request.params;
    const positiveInteger = RegExp(/^\d*\.?\d+$/);
    if (!positiveInteger.test(parseInt(transactionsId, 10))) {
      return response.status(400).json({
        status: 400,
        error: 'Invalid Id',
      });
    }
    next();
  }
  static async getTransactionsValidation(request, response, next) {
    const accountNumber = RegExp(/^\d*\.?\d+$/);
    const { accountNum } = request.params;
    if (isNaN(parseInt(accountNum, 10))) {
      return response.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    }
    if (accountNum.length !== 10) {
      return response.status(400).json({
        status: 400,
        error: 'account number must be a 10 digit number',
      });
    }
    if (!Number.isInteger(parseInt(accountNum, 10))) {
      return response.status(400).json({
        status: 400,
        error: 'Account number must be an Integer',
      });
    }
    if(!accountNumber.test(accountNum)) {
      return response.status(400).json({
        status:400,
        error: 'Invalid account number',
      })
    }
    next();
  }

}


export default Middleware;
