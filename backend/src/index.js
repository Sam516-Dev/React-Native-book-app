import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);-
  connectDB();
});
