import express from 'express';
import { getIncomes, createIncome, updateIncome, deleteIncome} from '../controllers/incomeController.js';
import auth from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/', auth, getIncomes);

router.post('/', auth, createIncome);

router.put('/:id', auth, updateIncome);

router.delete('/:id', auth, deleteIncome);

export default router;