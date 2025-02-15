import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({user: req.userId});
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};


export const createEpense = async (req, res) => {
    try{
        const {title, amount, date, category} = req.body;
        const newExpense = new Expense({title, amount, date, category});
        await newExpense.save();
        res.status(201).json({message: "Расход добавлен"});
    }
    catch(error){
        res.status(500).json({message: "Ошибка сервера", error});
    }
};

export const updateExpanse =async (req, res) => {
    try{
        const {id} = req.params;
        const {title, amount, date, category} = req.body;
        const updatedExpense = {title, amount, date, category};
        await Expense.findByIdAndUpdate(id, updatedExpense);
    }
    catch(error){
        res.status(500).json({message: "Ошибка сервера", error});
    }
};

export const deleteExpense = async (req, res) => {
    try{
        const {id} = req.params;
        await Expense.findByIdAndDelete(id);
        res.json({message: "Расход удален"});
    }
    catch(error){
        res.status(500).json({message: "Ошибка сервера", error});
    }
};