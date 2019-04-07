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
}

export default TransactionController;
