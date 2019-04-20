import Account from '../queryhelpers/accountQuery';


class AccountController {
  static async createAccount(request, response) {
    request.body.owner = request.userData.id;
    request.body.firstname = request.userData.firstname;
    request.body.lastname = request.userData.lastname;
    request.body.email = request.userData.email;
    const account = await Account.regAccount(request.body);
    return response.status(201).json({
      status: 201,
      data: account.rows,
      message: 'Account created successfully',
    });
  }

  static async patchAccount(request, response) {
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
    const account = await Account.oneAccount(request.params.accountNum)
    return response.status(200).json({
      status: 200,
      data: account.rows,
    });
  }

  static async getAllTransactions(request, response) {
    // eslint-disable-next-line max-len
    const alltran = await Account.allTransactions(request.params.accountNum);
    return response.status(200).json({
      status: 200,
      data: alltran.rows,
    });
  }

  static async getAccounts(request, response) {
    const account = await Account.allAccounts();
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
    await Account.delAccount(request.params.accountNum);
    return response.status(200).json({
      status: 200,
      message: 'Account deleted successfully',
    });
  }
}

export default AccountController;
