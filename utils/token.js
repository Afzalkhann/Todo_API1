const jwt=require('jsonwebtoken')
require('dotenv').config()


const generateAuthToken=(userId)=>{
    const scretKey=process.env.screteKey;
    const payload={
        userId
    }

    const options={
        expiresIn:'1h'
    }

    const token=jwt.sign(payload,scretKey)
    return token
}

module.exports = {
    generateAuthToken
};