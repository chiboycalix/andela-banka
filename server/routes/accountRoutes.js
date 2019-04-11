import express from 'express';
import AccountController from '../controllers/AccountController';
import isUser from '../middlewares/isUser';
import isStaff from '../middlewares/isStaff';
import isValidAccount from '../middlewares/accountsValidations';


const router = express.Router();

router.post('/', isUser, AccountController.createAccount);
router.patch('/:accountNum', isValidAccount, isStaff, AccountController.patchAccount);
router.get('/:accountNum', isValidAccount, isStaff, AccountController.getAccount);
router.get('/', isStaff, AccountController.getAccounts);
router.delete('/:accountNum', isValidAccount, isStaff, AccountController.deleteAccount);

export default router;
