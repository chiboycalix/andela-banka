import TransactionController from '../controllers/TransactionController';
import authorizeMiddleware from '../middlewares/authorizeMiddleware';
import accountMiddleware from '../middlewares/accountMiddleware';
import authenticateMiddleware from '../middlewares/authenticateMiddleware';
import AccountController from '../controllers/AccountController';
import UserController from '../controllers/UserController';

const { clientData, staffData, emailCheck } = authorizeMiddleware;
const { accountValidation, debitValidation, isValidId,createAccountValidation, getTransactionsValidation } = accountMiddleware;
const { signupValidations, loginValidations } = authenticateMiddleware;

export default (router) => {
  router.get('/', (request, response) => response.status(200).json({
    status: 200,
    message: 'Welcome to banka',
  }));
  
  router.post('/api/v1/transactions/:accountNum/debit', staffData, accountValidation, debitValidation, TransactionController.debitAccount);
  router.post('/api/v1/transactions/:accountNum/credit', staffData, accountValidation, TransactionController.creditAccount);
  router.get('/api/v1/transactions/:transactionsId', clientData, isValidId, TransactionController.getTransaction);

  router.post('/api/v1/accounts/', clientData, createAccountValidation, AccountController.createAccount);
  router.get('/api/v1/accounts/:accountNum', clientData, accountValidation, AccountController.getAccount);
  router.get('/api/v1/accounts/:accountNum/transactions', clientData, getTransactionsValidation, AccountController.getAllTransactions);
  router.patch('/api/v1/accounts/:accountNum', staffData, getTransactionsValidation, AccountController.editAccount);
  router.get('/api/v1/accounts/', staffData, AccountController.getAccounts);
  router.delete('/api/v1/accounts/:accountNum', staffData, getTransactionsValidation, AccountController.deleteAccount);

  router.post('/api/v1/auth/signup', signupValidations, UserController.signup);
  router.post('/api/v1/auth/login', loginValidations, UserController.login);
  router.get('/api/v1/user/:userEmail/accounts', clientData, emailCheck, UserController.getAccounts);
  
  router.use('*', (request, response) => response.status(404).json({
    status: 404,
    error: '404 NOT FOUND',
  }));
}