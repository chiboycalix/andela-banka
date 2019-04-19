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

  static creditAccount(request, response) {
    const { accountNum } = request.params;
    const { amount, transactionType } = request.body;
    const { id } = request.userData;
    for (let i = 0; i < accounts.length; i += 1) {
      if (accounts[i].accountNumber === accountNum) {
        let oldBalance = accounts[i].balance;
        const transaction = {
          transactionId: transactions.length + 1,
          createdOn: new Date(),
          cashier: id,
          amount,
          accountNumber: accounts[i].accountNumber,
          oldBalance,
          newBalance: oldBalance += amount,
        };
        accounts[i].balance = transaction.newBalance;
        transactions.push(transaction);
        return response.status(201).json({
          status: 201,
          data: {
            transactionId: transaction.transactionId,
            accountNumber: parseInt(accountNum, 10),
            amount,
            transactionType,
            accountBalance: transaction.newBalance,
          },
        });
      }
    }
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
