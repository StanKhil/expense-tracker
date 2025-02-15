import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
const dbURI = 'mongodb+srv://stankhil:rzYb4hZOqfToV3QE@cluster0.ziph0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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