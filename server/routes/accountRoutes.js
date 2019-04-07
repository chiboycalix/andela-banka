import express from 'express';
import AccountController from '../controllers/AccountController';
import isUser from '../middlewares/isUser';
import isStaff from '../middlewares/isStaff';


const router = express.Router();

router.post('/', isUser, AccountController.createAccount);
router.patch('/:accountNum', isStaff, AccountController.patchAccount);

export default router;
