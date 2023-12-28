const jwt = require('jsonwebtoken');
const pool = require('../utils/db');
require('dotenv').config()

const authenticateUser =async (req, res, next) => {
    // Get token from headers
    const tokenWithBearer = req.headers.authorization || '';
    const {email}=req.body
    //removing "bearer" from token
    const token = tokenWithBearer.slice(7)
    // Check if token is provided
    
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token,process.env.screteKey); 
        req.user = decoded; 
        // const checkUserquery='select * from users where email=$1';
        // const checkUserResult=await pool.query(checkUserquery,[email])
        
        //verifying req user id match with user id extracted from token
        // if(req.user.userId!=checkUserResult.rows[0].user_id){
        //     return res.status(401).json({ message: 'Invalid token' });
        // }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authenticateUser,
};