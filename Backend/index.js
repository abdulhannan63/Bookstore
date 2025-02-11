const express = require('express');
const db = require('./conn/conn');
const user = require('./routes/user');
const books = require('./routes/book');
const favourite = require('./routes/favourite');
const cart = require('./routes/cart');
const Order = require('./routes/order');
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
// routing
app.use('/api/v1',user);
app.use('/api/v2',books);
app.use('/api/v2',favourite);
app.use('/api/v2',cart);
app.use('/api/v2',Order);

// function to get connected with mongodb
db();
app.listen(process.env.PORT, () => {
    console.log("listening at 1000");
})