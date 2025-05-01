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
    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("username", "profileImage");
    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      books,
      currentPage: page,
      totalPages,
      totalBooks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


//get recommended books when user is logged in
router.get("/user", protectRoute, async (req, res) =>{
  try {
    const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})

router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // Check if the user is the owner of the book
    if (book.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this book" });
    }
    // Delete the image from cloudinary
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.error("Error deleting image from Cloudinary:", deleteError);
        return res
          .status(500)
          .json({ message: "Error deleting image from Cloudinary" });
      }
    }

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
