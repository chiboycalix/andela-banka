import express from 'express';
import TransactionController from '../controllers/TransactionController';
import isStaff from '../middlewares/isStaff';
import isUser from '../middlewares/isUser';
import isValidTransaction from '../middlewares/debitValidation';
import accountValidations from '../middlewares/accountValidations';

const router = express.Router();


// Staff can debit a user account
router.post('/:accountNum/debit', isStaff, accountValidations, isValidTransaction, TransactionController.debitAccount);

// Staff can credit a user account
router.post('/:accountNum/credit', isStaff, accountValidations, TransactionController.creditAccount);

// User can view a particular transaction he or she made
router.get('/:transactionsId', isUser, TransactionController.getTransaction);

export default router;
