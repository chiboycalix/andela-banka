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


  static getAllTransactions(request, response) {
    const { accountNum } = request.params;
    const transaction = transactions.filter(transac => transac.accountNumber === accountNum);
    return response.status(200).json({
      status: 200,
      data: transaction,
    });
  }

  static getTransaction(request, response) {
    const { transactionId } = request.params;
    for (let i = 0; i < transactions.length; i += 1) {
      if (transactions[i].id === transactionId) {
        return response.status(200).json({
          status: 200,
          data: transactions[i],
        });
      }
    }
  }
}

export default TransactionController;
