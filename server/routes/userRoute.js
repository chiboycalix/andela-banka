import express from 'express';
import UserController from '../controllers/UserController';
import isUser from '../middlewares/isUser';

const router = express.Router();

router.get('/:userEmail/accounts', isUser, UserController.getAccounts);

export default router;
