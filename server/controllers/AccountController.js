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
            accountNumber: parseInt(account.accountNumber, 10),
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

  static patchAccount(request, response) {
    const { accountNum } = request.params;
    const { status } = request.body;
    for (let i = 0; i < accounts.length; i += 1) {
      if (accounts[i].accountNumber === accountNum) {
        accounts[i].status = status;
        return response.status(200).json({
          status: 200,
          data: {
            accountNumber: accountNum,
            status,
          },
        });
      }
    }
  }

  static getAccount(request, response) {
    const { accountNum } = request.params;
    const { id } = request.userData;
    for (let i = 0; i < accounts.length; i += 1) {
      if (accounts[i].accountNumber === accountNum) {
        return response.status(200).json({
          status: 200,
          data: {
            userId: id,
            accountNum,
            status: accounts[i].status,
            balance: accounts[i].balance,
          },
        });
      }
    }
  }

  static getAccounts(request, response) {
    return response.status(200).json({
      status: 200,
      data: accounts,
    });
  }

  static deleteAccount(request, response) {
    const { accountNum } = request.params;
    for (let i = 0; i < accounts.length; i += 1) {
      if (accounts[i].accountNumber === accountNum) {
        accounts.splice(accounts[i].id - 1, 1);
        return response.status(200).json({
          status: 200,
          message: 'Account successfully deleted',
        });
      }
    }
  }
}

export default AccountController;
