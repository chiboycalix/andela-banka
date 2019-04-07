import express from 'express';
import AccountController from '../controllers/AccountController';
import isUser from '../middlewares/isUser';


const router = express.Router();

router.post('/', isUser, AccountController.createAccount);

export default router;
