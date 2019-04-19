import express from 'express';
import TransactionController from '../controllers/TransactionController';
// import isStaff from '../middlewares/isStaff';
import isUser from '../middlewares/isUser';
// import isValidTransaction from '../middlewares/debitValidation';

const router = express.Router();

router.post('/:accountNum/debit', isUser, TransactionController.debitAccount);
router.post('/:accountNum/credit', isUser, TransactionController.creditAccount);
router.get('/:transactionsId', TransactionController.getTransaction);

export default router;
