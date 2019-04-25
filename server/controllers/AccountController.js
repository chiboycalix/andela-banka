import Account from '../queryhelpers/accountQuery';

class AccountController {
  static async createAccount(request, response) {
    request.body.owner = request.userData.id;
    request.body.firstname = request.userData.firstname;
    request.body.lastname = request.userData.lastname;
    request.body.email = request.userData.email;
    const account = await Account.registerAccount(request.body);
    const {
      firstname, lastname, email, accountnumber, balance, type, owner,
    } = account.rows[0];
    return response.status(201).json({
      status: 201,
      data: {
        firstname,
        lastname,
        email,
        owner,
        accountNumber: accountnumber,
        openingBalance: balance,
        type,
      },
      message: 'Account created successfully',
    });
  }

  static async editAccount(request, response) {
    request.body.accountnumber = request.params.accountNum;
    const checkAccount = await Account.checkAccount(request.params.accountNum);
    if (!checkAccount) {
      return response.status(404).json({
        status: 404,
        error: 'Account does not exist',
      });
    }
    const account = await Account.changeAccount(request.body);
    return response.status(200).json({
      status: 200,
      data: account.rows,
      message: 'Account edited',
    });
  }

  static async getAccount(request, response) {
    const checkAccount = await Account.checkAccount(request.params.accountNum);
    if (!checkAccount) {
      return response.status(404).json({
        status: 404,
        error: 'Account does not exist',
      });
    }
    const account = await Account.getOneAccount(request.params.accountNum);
    const {
      createdon, id, owner, email, type, accountnumber, balance,
    } = account.rows[0];
    return response.status(200).json({
      status: 200,
      data: {
        id,
        createdon,
        ownerEmail: email,
        ownerId: owner,
        type,
        accountNumber: accountnumber,
        balance,
      },
    });
  }

  static async getAllTransactions(request, response) {
    const alltransactions = await Account.getAllTransactions(request.params.accountNum);
    return response.status(200).json({
      status: 200,
      data: alltransactions.rows,
    });
  }

  static async getAccounts(request, response) {
    const active = await Account.getActiveAccounts(request.query.status);
    if (active.rows.length === 0) {
      return response.status(200).json({
        status: 200,
        message: `No ${request.query.status} account`
      });
    }
    if (request.query.status) {
      return response.status(200).json({
        status: 200,
        data: active.rows,
      });
    }
    const account = await Account.getAllAccounts();
    return response.status(200).json({
      status: 200,
      data: account.rows,
    });
  }


  static async deleteAccount(request, response) {
    const checkAccount = await Account.checkAccount(request.params.accountNum);
    if (!checkAccount) {
      return response.status(404).json({
        status: 404,
        error: 'Account does not exist',
      });
    }
    await Account.deleleAccount(request.params.accountNum);
    return response.status(200).json({
      status: 200,
      message: 'Account deleted successfully',
    });
  }
}

export default AccountController;
