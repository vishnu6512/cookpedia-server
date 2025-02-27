const users = require("../models/userModel");
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
//add user
exports.addUserController= async (req,res)=>{
    console.log("inside addUserController");
    const {username,email,password}=req.body
    try{
        const existingUser=await users.findOne({email:email})
        if(existingUser){
            res.status(400).json({message:"User already exists"})
        } else{
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser=new users({
                username,
                email,
                password:encryptedPassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
        
    }catch(err){
        res.status(401).json(err)
    }
}

//login user
exports.loginController= async (req,res)=>{
    console.log("inside loginController");
    const {email,password}=req.body
    try{
        const existingUser=await users.findOne({email:email})
        if(existingUser){
            const isPasswordMatch=await bcrypt.compare(password,existingUser.password)
            if(isPasswordMatch || password==existingUser.password){
                const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
                res.status(200).json({user:existingUser,token})
            } else{
                res.status(400).json({message:"Invalid credentials"})
            }
        } else{
            res.status(400).json({message:"User does not exist"})
        }
    }catch(err){
        res.status(500).json(err)
    }
}