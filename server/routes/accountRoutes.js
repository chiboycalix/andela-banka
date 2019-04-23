import express from 'express';
import AccountController from '../controllers/AccountController';
import isUser from '../middlewares/isUser';
import isStaff from '../middlewares/isStaff';
import accountValidations from '../middlewares/accountValidations';
import createAccount from '../middlewares/createAccount';


const router = express.Router();

// User can create a bank account
router.post('/', isUser, createAccount, AccountController.createAccount);

// User can view account created by him or her
router.get('/:accountNum', isUser, accountValidations, AccountController.getAccount);

// User can view all transactions made on a particular account by him or her
router.get('/:accountNum/transactions', isUser, AccountController.getAllTransactions);

// Staff can patch an account (active, dormant or draft)
router.patch('/:accountNum', isStaff, accountValidations, AccountController.patchAccount);

// Staff can view all bank accounts created in the system
router.get('/', isStaff, AccountController.getAccounts);

// Staff can delete a particular bank account
router.delete('/:accountNum', isStaff, accountValidations, AccountController.deleteAccount);

export default router;
