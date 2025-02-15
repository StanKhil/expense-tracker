import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({user: req.userId});
    res.json(expenses);
  } catch (error) {
    console.log("Error during getting expenses:", error);
    console.log("secret", process.env.JWT_SECRET);
    console.log("token", token);
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};


export const createExpense = async (req, res) => {
    try {
        const { title, amount, date, category } = req.body;
        const expense = new Expense({
            title,
            amount,
            date,
            category,
            user: req.userId
        });

        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};

export const updateExpense =async (req, res) => {
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