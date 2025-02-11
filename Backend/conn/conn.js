const mongoose = require("mongoose");
require('dotenv').config();
async function conn() {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
        
    }
}
module.exports= conn;