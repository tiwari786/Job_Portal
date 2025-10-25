import express from 'express';
import cookieParser from 'cookie-parser'; // Importing cookie-parser for handling cookies
import cors from 'cors'; // Importing cors for handling CORS issues
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from './routes/userRouter.js';
import companyRouter from './routes/companyRouter.js';
import jobRouter from './routes/jobRouter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies

// CORS configuration
// Allow requests from the frontend and enable credentials
// Adjust the origin to match your frontend URL
// If your frontend is running on a different port or domain, change 'http://localhost:5173' accordingly
const corsOptions = {
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true,
};
app.use(cors(corsOptions)); // Use CORS middleware with the specified options



// Apis
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/job", jobRouter)




app.listen(PORT, () => {
    // Connect to the database
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});