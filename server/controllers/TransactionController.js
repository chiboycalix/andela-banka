import accounts from '../db/accounts';
import transactions from '../db/transactions';
import Transaction from '../queryhelpers/transactionQuery';

class TransactionController {
  static async debitAccount(request, response) {
    request.body.accountnumber = request.params.accountNum;
    request.body.cashier = request.userData.id;
    const transaction = await Transaction.debit(request.body);
    return response.status(200).json({
      status: 200,
      data: transaction.rows[0],
      message: `Account debited by ${request.body.amount}`,
    });
  }

  static async creditAccount(request, response) {
    request.body.accountnumber = request.params.accountNum;
    request.body.cashier = request.userData.id;
    const transaction = await Transaction.credit(request.body);
    return response.status(200).json({
      status: 200,
      data: transaction.rows[0],
      message: `Account credited with ${request.body.amount}`,
    });
  }

  static async getTransaction(request, response) {
    const checkTransac = await Transaction.checkTransac(request.params.transactionsId);
    if (!checkTransac) {
      return response.status(404).json({
        status: 404,
        error: 'Transaction does not exist',
      });
    }
    const onetran = await Transaction.oneTransaction(request.params.transactionsId);
    return response.status(200).json({
      status: 200,
      data: onetran.rows,
    });
  }
}

export default TransactionController;
