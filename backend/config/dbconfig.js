import mongoose from 'mongoose';
import 'dotenv/config'
mongoose.set('strictQuery', false);
const dbURI = process.env.URIDB;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};

export default connectDB;