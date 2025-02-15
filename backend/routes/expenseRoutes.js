import express from 'express';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', auth, getExpenses);

router.post('/', auth, createExpense);

router.put('/:id', auth, updateExpense);

router.delete('/:id', auth, deleteExpense);

export default router;