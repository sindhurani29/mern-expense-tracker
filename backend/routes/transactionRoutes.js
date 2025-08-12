import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { listTransactions, createTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';

const router = express.Router();
router.use(auth);
router.get('/', listTransactions);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;