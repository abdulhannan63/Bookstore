const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken =(req,res,next)=>{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message:'Authorization required'});

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if (err) return res.status(403).json(err);
        req.user = user;
        next();
    });
};

module.exports = {authenticateToken};