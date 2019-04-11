import accounts from '../db/accounts';
import transactions from '../db/transactions';

class TransactionController {
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
            accountNumber: accountNum,
            amount,
            transactionType,
            accountBalance: transaction.newBalance,
          },
        });
      }
    }
  }

  static debitAccount(request, response) {
    const { accountNum } = request.params;
    const { amount, transactionType } = request.body;
    const { id } = request.userData;
    for (let i = 0; i < accounts.length; i += 1) {
      if (accounts[i].accountNumber === accountNum) {
        let oldBalance = accounts[i].balance;
        const transaction = {
          transactionId: transactions.length + 1,
          createdOn: new Date().getFullYear,
          cashier: id,
          amount,
          accountNumber: accounts[i].accountNumber,
          oldBalance,
          newBalance: oldBalance -= amount,
        };
        accounts[i].balance = transaction.newBalance;
        transactions.push(transaction);
        return response.status(201).json({
          status: 201,
          data: {
            transactionId: transaction.transactionId,
            accountNumber: accountNum,
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
    const transaction = transactions.filter(transac => transac.id === transactionId);
    return response.status(200).json({
      status: 200,
      data: transaction[0],
    });
  }
}

export default TransactionController;
