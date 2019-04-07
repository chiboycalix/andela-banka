/* eslint-disable no-restricted-globals */
import accounts from '../db/accounts';
import users from '../db/users';


class AccountController {
  static createAccount(request, response) {
    const { type, balance } = request.body;
    const { id } = request.userData;
    const accountNumber = Math.random().toString().slice(2, 12);
    const account = {
      id: accounts.length + 1,
      accountNumber,
      owner: id,
      createdOn: new Date(),
      status: 'active',
      type,
      balance,
    };
    accounts.push(account);
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === id) {
        return response.status(201).json({
          status: 201,
          data: {
            accountNumber: account.accountNumber,
            firstName: users[i].firstName,
            lastName: users[i].lastName,
            email: users[i].email,
            type: account.type,
            createdOn: account.createdOn,
            balance: parseFloat(balance, 10).toFixed(2),
          },
        });
      }
    }
  }
}

export default AccountController;
