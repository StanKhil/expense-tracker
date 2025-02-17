import express from 'express';
import { getExpenses, createExpense, updateExpense, deleteExpense, getExpensesByCategory, getExpensesByDate, getExpensesByMonth, getExpensesByYear } from '../controllers/expenseController.js';
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', auth, getExpenses);

router.post('/', auth, createExpense);

router.put('/:id', auth, updateExpense);

router.delete('/:id', auth, deleteExpense);

router.get('/category/:category', auth, getExpensesByCategory);

router.get('/date/:date', auth, getExpensesByDate);

router.get('/month/:year/:month', auth, getExpensesByMonth);

router.get('/year/:year', auth, getExpensesByYear);


export default router;