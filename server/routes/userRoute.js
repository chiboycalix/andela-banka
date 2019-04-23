import express from 'express';
import UserController from '../controllers/UserController';
// import isUser from '../middlewares/isUser';
import isStaff from '../middlewares/isStaff';

const router = express.Router();


// Staff can view all bank accounts owned by a particular email
router.get('/:userEmail/accounts', isStaff, UserController.getAccounts);

export default router;
