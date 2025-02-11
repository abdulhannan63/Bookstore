const router = require('express').Router();
const User = require("../models/user");
const Book = require("../models/books")
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./userAuth');
const books = require('../models/books');

// functionality to add book
router.post("/addbook", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to add book" });
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: "Book added sucessfuly" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
// function to update the book details
router.put("/updatebook", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid,
            {
                url: req.body.url,
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                desc: req.body.desc,
                language: req.body.language,
            }
        )
        return res.status(200).json({ message: "Book updated sucessfuly" })

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
// function to delete the book
router.delete("/deletebook", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        res.status(200).json({ message: "Book deleted sucessfuly" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})
// function to get all books
router.get("/getbooks", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.status(200).json({
            status: "success",
            data: books
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})
// get recently added 4 books
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.status(200).json({
            status: "success",
            data: books
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})
// get book by id
router.get("/get-books-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({
            status: "success",
            data: book
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = router;