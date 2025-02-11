const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken }=require('./userAuth');
require('dotenv').config();
// sign Up
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        // checking username length more then 5
        if (username.length <= 5) {
            return res.status(400).json({ msg: "username must be more then 4 character" });
        }
        // check username already exists
        const existinguser = await User.findOne({ username: username });
        if (existinguser) {
            return res.status(400).json({ msg: "user Name already exists" });
        }
        // checking email
        const existingemail = await User.findOne({ email: email });
        if (existingemail) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        if (password.length <= 5) {
            return res.status(400).json({ msg: "password should be more the 5 in length" });
        }
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({ username: username, email: email, password: hashPass, address: address });
        await newUser.save();
        return res.status(200).json({ message: "signUp successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existUser = await User.findOne({ username });
        if (!existUser) {
            res.status(400).json({ message: "Invalid user name" });
        }
        await bcrypt.compare(password, existUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    { name: existUser.username },
                    { role: existUser.role },
                ];
                const token = jwt.sign({ authClaims }, 
                    process.env.SECRET_KEY,
                     { expiresIn: "30d" },);
                res.status(200).json({id:existUser._id,role:existUser.role,token:token});
            } else {
                res.status(400).json({ message: "Invalid password" });
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})
router.get('/get-user-info',authenticateToken,async (req,res)=>{
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})
// updating the address functionality
router.put('/update-address',authenticateToken,async (req,res)=>{
    try {
        const {id} = req.headers;
        const {address} = req.body;
        const data = await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated successfully"});
    }
    catch(err){
        res.status(500).json({ message: "Server Error" });
    }
})
module.exports = router;