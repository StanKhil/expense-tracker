import Income from "../models/Income.js";

export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({user: req.userId});
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error });
  }
};


export const createIncome = async (req, res) => {
    try {
        const { title, amount, date, category } = req.body;
        const income = new Income({
            title,
            amount,
            date,
            category,
            user: req.userId
        });

        await income.save();
        res.status(201).json(income);
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера", error });
    }
};

export const updateIncome =async (req, res) => {
    try{
        const {id} = req.params;
        const {title, amount, date, category} = req.body;
        const updatedIncome= {title, amount, date, category};
        await Income.findByIdAndUpdate(id, updatedIncome);
    }
    catch(error){
        res.status(500).json({message: "Помилка сервера", error});
    }
};

export const deleteIncome = async (req, res) => {
    try{
        const {id} = req.params;
        await Income.findByIdAndDelete(id);
        res.json({message: "Прибуток видалено"});
    }
    catch(error){
        res.status(500).json({message: "Помилка сервера", error});
    }
};