import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from './routes/bookroutes.js';


const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
