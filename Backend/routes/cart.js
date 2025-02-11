const router = require('express').Router();
const User = require("../models/user");
const { authenticateToken } = require('./userAuth');

// add to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userD = await User.findById(id);
        const isBookCart = userD.cart.includes(bookid);
        if (isBookCart) {
            return res.status(200).json({ status: "success", message: "already in cart" });
        }
        await User.findByIdAndUpdate(id,
            { $push: { cart: bookid } });
        return res.status(200).json({ status: "success", message: "Book added cart cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
// function to renove the book from the Cart
router.put("/delete-from-cart/:bookid",
    authenticateToken,
    async (req, res) => {
        try {
            const { bookid } = req.params;
            const { id } = req.headers;
            const userD = await User.findById(id);
            await User.findByIdAndUpdate(id,
                { $pull: { cart: bookid } });
            return res.status(200).json({ status: "sucess", message: "Book Removed from cart" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    })
// get favourate book of perticular user
router.get("/get-cart-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userD = await User.findById(id).populate("cart");
        const cartBook = userD.cart.reverse();
        return res.json(({
            status: "success",
            data: cartBook,
        }))
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
module.exports = router;