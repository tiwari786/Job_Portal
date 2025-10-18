import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_LOCAL_URI)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Database Connection Failed", error)
    }
}


export default connectDB;