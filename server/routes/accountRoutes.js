import express from 'express';
import AccountController from '../controllers/AccountController';
import isUser from '../middlewares/isUser';
import isStaff from '../middlewares/isStaff';
import accountValidations from '../middlewares/accountValidations';


const router = express.Router();

router.post('/', isUser, AccountController.createAccount);
router.patch('/:accountNum', isStaff, accountValidations, AccountController.patchAccount);
router.get('/', isStaff, AccountController.getAccounts);
router.get('/:accountNum', isStaff, accountValidations, AccountController.getAccount);
router.delete('/:accountNum', isStaff, accountValidations, AccountController.deleteAccount);

export default router;
