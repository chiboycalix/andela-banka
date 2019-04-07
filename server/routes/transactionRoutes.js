import express from 'express';
import TransactionController from '../controllers/TransactionController';
import isStaff from '../middlewares/isStaff';
import isValidTransaction from '../middlewares/debitValidation';

const router = express.Router();

router.post('/:accountNum/debit', isStaff, isValidTransaction, TransactionController.debitAccount);
router.post('/:accountNum/credit', isStaff, TransactionController.creditAccount);
router.get('/:accountNum/transactions', TransactionController.getAllTransactions);
router.get('/:accountNum/transactions/:transactionsId', TransactionController.getTransaction);

export default router;
