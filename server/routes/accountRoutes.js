import express from 'express';
import AccountController from '../controllers/AccountController';
import isUser from '../middlewares/isUser';
import isStaff from '../middlewares/isStaff';
import accountValidations from '../middlewares/accountValidations';


const router = express.Router();

router.post('/', isUser, AccountController.createAccount);
router.patch('/:accountNum', accountValidations, AccountController.patchAccount);
router.get('/', isUser, AccountController.getAccounts);
router.get('/:accountNum', isStaff, accountValidations, AccountController.getAccount);
router.delete('/:accountNum', accountValidations, AccountController.deleteAccount);
router.get('/:accountNum/transactions', isUser, AccountController.getAllTransactions);

export default router;
