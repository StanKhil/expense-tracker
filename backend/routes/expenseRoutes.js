import express from 'express';
import { getExpenses, createEpense, updateExpanse, deleteExpense } from '../controllers/expenseController.js';
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', auth, getExpenses);

router.post('/', auth, createEpense);

router.put('/:id', auth, updateExpanse);

router.delete('/:id', auth, deleteExpense);

export default router;