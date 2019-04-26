import Transaction from '../queryhelpers/transactionQuery';

class TransactionController {
  /**
   * Debits an account
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof TransactionController
   */
  static async debitAccount(request, response) {
    request.body.accountnumber = request.params.accountNum;
    request.body.cashier = request.userData.id;
    const checkAccountNumber = await Transaction.checkAccountNumber(request.params.accountNum);
    if (!checkAccountNumber) {
      return response.status(404).json({
        status: 404,
        error: 'Account does not exist',
      });
    }
    const transaction = await Transaction.debit(request.body);
    return response.status(200).json({
      status: 200,
      data: transaction.rows[0],
      message: `Account debited by ${request.body.amount}`,
    });
  }

  /**
   * Credits an account
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof TransactionController
   */
  static async creditAccount(request, response) {
    request.body.accountnumber = request.params.accountNum;
    request.body.cashier = request.userData.id;
    const checkAccountNumber = await Transaction.checkAccountNumber(request.params.accountNum);
    if (!checkAccountNumber) {
      return response.status(404).json({
        status: 404,
        error: 'Account does not exist',
      });
    }
    const transaction = await Transaction.credit(request.body);
    return response.status(200).json({
      status: 200,
      data: transaction.rows[0],
      message: `Account credited with ${request.body.amount}`,
    });
  }

  /**
   * Gets a single transaction
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof TransactionController
   */
  static async getTransaction(request, response) {
    const checkTransaction = await Transaction.checkTransaction(request.params.transactionsId);
    if (!checkTransaction) {
      return response.status(404).json({
        status: 404,
        error: 'Transaction does not exist',
      });
    }
    const onetransaction = await Transaction.oneTransaction(request.params.transactionsId);
    return response.status(200).json({
      status: 200,
      data: onetransaction.rows,
    });
  }
}

export default TransactionController;
