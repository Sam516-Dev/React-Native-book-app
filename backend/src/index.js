import express from 'express';
import {connectDB} from './lib/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;


app.use("/api/auth", authRoutes)


app.listen (PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
})