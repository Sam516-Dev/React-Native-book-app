import express from "express";
import Book from "../models/Book.js";
const router = express.Router();
import cloudinary from "../lib/cloudinary.js";
import protectRoute from "../middleware/auth.middleware.js";

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the book already exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).json({ message: "Book title already exists" });
    }
    //upload image to cloudinary
    const uploadResponce = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponce.secure_url;

    const book = new Book({
      title,
      caption,
      rating,
      imageUrl,
      // user: req.user._id,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", protectRoute, async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
