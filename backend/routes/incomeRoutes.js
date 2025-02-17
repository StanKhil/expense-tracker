import express from 'express';
import { getIncomes, createIncome, updateIncome, deleteIncome,getIncomesByCategory, getIncomesByDate, getIncomesByMonth, getIncomesByYear} from '../controllers/incomeController.js';
import auth from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/', auth, getIncomes);

router.post('/', auth, createIncome);

router.put('/:id', auth, updateIncome);

router.delete('/:id', auth, deleteIncome);

router.get('/category/:category', auth, getIncomesByCategory);

router.get('/date/:date', auth, getIncomesByDate);

router.get('/month/:year/:month', auth, getIncomesByMonth);

router.get('/year/:year', auth, getIncomesByYear);


export default router;