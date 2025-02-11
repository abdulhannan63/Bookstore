const router = require('express').Router();
const { json } = require('express');
const User = require("../models/user");
const { authenticateToken } = require('./userAuth');

// add to favourite
router.put("/add-book-favourite", authenticateToken,
    async (req, res) => {
        try {
            const { bookid, id } = req.headers;
            const userD = await User.findById(id);
            const isBookfav = userD.favourate.includes(bookid);
            if (isBookfav) {
                return res.status(200).json({ message: "already in favourate" });
            }
            await User.findByIdAndUpdate(id,
                { $push: { favourate: bookid } })
            return res.status(200).json({ message: "Book added in favourate" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    })
// function to delete the book from the favourate
router.put("/delete-from-favourite",
    authenticateToken,
    async (req, res) => {
        try {
            const { bookid, id } = req.headers;
            const userD = await User.findById(id);
            const isBookfav = userD.favourate.includes(bookid);
            if (isBookfav) {
                await User.findByIdAndUpdate(id,
                    { $pull: { favourate: bookid } });
            }
            return res.status(200).json({ message: "Book Removed from favourite" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    })
// get favourate book of perticular user
router.get("/get-favourate-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userD = await User.findById(id).populate("favourate");
        const favBook = userD.favourate;
        return res.json(({
            status: "success",
            data: favBook,
        }))
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
module.exports = router;