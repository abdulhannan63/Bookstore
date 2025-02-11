const router = require('express').Router();
const User = require("../models/user");
const Book = require("../models/books");
const Order = require("../models/order");

const { authenticateToken } = require('./userAuth');

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderFromDb = await newOrder.save();
            // saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderFromDb._id }
            });
            // clearing cart 
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
            })
        }
        return res.json({ status: "success", message: "Order placed" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
// get order history
router.get('/get-order-history', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userD = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },

        })

        const orderD = userD.orders.reverse();
        return res.json({ status: "success", data: orderD });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
// get all orders for admin
router.get('/get-all-orders', authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({ path: "book" })
            .populate({
                path: "user"
            }).sort({ createdAt: -1 });
        return res.json({ data: userData });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
// update order ---admin
router.put('/update-status/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({
            status: "success",
            message: "Order status updated"
        });
    } catch (error) {
        res.status(500).json({ message: "An server error" });
    }
})
module.exports = router