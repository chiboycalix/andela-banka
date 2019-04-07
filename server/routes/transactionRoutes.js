import express from 'express';
import TransactionController from '../controllers/TransactionController';
import isStaff from '../middlewares/isStaff';

const router = express.Router();

router.post('/:accountNum/credit', isStaff, TransactionController.creditAccount);


export default router;
