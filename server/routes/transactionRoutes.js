import express from 'express';
import TransactionController from '../controllers/TransactionController';
import isStaff from '../middlewares/isStaff';
import isValidTransaction from '../middlewares/debitValidation';
import accountValidations from '../middlewares/accountValidations';

const router = express.Router();


router.post('/:accountNum/debit', isStaff, accountValidations, isValidTransaction, TransactionController.debitAccount);
router.post('/:accountNum/credit', isStaff, accountValidations, TransactionController.creditAccount);
router.get('/:accountNum/transactions', accountValidations, TransactionController.getAllTransactions);
router.get('/:accountNum/transactions/:transactionsId', accountValidations, TransactionController.getTransaction);

export default router;
