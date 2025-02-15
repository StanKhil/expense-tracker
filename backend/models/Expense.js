import mongoose from 'mongoose';

const EpenseShema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
}, { timestamps: false });

const Expense = mongoose.model('EpenseShema', EpenseShema);

export default Expense;