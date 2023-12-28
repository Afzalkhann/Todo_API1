const pool=require('../utils/db')
const User=require('../models/user')
const { generateAuthToken }=require('../utils/token')
require('dotenv').config()
// const nodemailer = require('nodemailer');
// const { v4: uuidv4 } = require('uuid');

const registerUser=async (req,res)=>{
    const {email,name}=req.body;
    //const verificationToken = uuidv4();
    // const transporter = nodemailer.createTransport({
    //     service: 'Gmail', // Update with your email service provider
    //     auth: {
    //       user: process.env.email,
    //       pass: process.env.password
    //     }
    //   });

    //   const mailOptions = {
    //     from: process.env.email,
    //     to: email, // User's email
    //     subject: 'Account Verification',
    //     html: `<p>Click <a href="http://localhost:3000/users/verify/${verificationToken}">here</a> to verify your account.</p>`
    //   };
    try{
        // Check if user with email already exists
        if(!email || !name){
            return res.status(500).json({error:"name or email is not valid"})
        }
        const checkUserquery='select * from users where email=$1';
        const checkUserResult=await pool.query(checkUserquery,[email])
        
        if(checkUserResult.rows.length>0){
            return res.status(400).json({message:'User with this email already exists',
                                        data:checkUserResult.rows[0]})
        }

        // Create new user when not exists
        //const info = await transporter.sendMail(mailOptions);
        //console.log('Email sent:', info.response);
        const createQuery='insert into users (name,email,createdAt) values($1,$2,$3) returning *';
        const values=[name,email,new Date()];
        const result= await pool.query(createQuery,values);
        const newUser= new User(
            result.rows[0].userId,
            result.rows[0].name,
            result.rows[0].email,
            result.rows[0].createdAt
        )
        console.log("user registered successfully")
        res.status(201).json({ message: 'user registered successfully'})

    }catch(err){
        res.status(500).json({error:err.message})
    }

}
const verify=async (req, res) => {
    const { token } = req.params;
    const query='select * from users where token=$1';
    const checkUserResult=await pool.query(query,[token])
        
    if(checkUserResult.rows.length>0 && checkUserResult.rows[0].verified ==false){
        const Updatequery='update users set verified=$1 where token=$2 returning *'
        const result=await pool.query(Updatequery,[true,token])
        return res.status(200).json({message:'User verified successfully',
                                        data:result})
    }
    
  };


const loginUser = async (req, res) => {
    const { email } = req.body;
    try {
        if(!email){
            return res.status(400).json({ error: 'Email is required' });
        }
        // Check if user with email exists
        const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
        const checkUserResult = await pool.query(checkUserQuery, [email]);
        if (checkUserResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("user details",checkUserResult.rows[0])
        const authToken = generateAuthToken(checkUserResult.rows[0].user_id); 
        res.json({ authToken }); // Send token to the client

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    registerUser,
    loginUser,
    verify
}