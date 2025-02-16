import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Income = mongoose.model('Income', IncomeSchema);

export default Income;
