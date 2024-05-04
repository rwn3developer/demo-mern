const express = require('express');

const routes = express.Router();

const User = require('../models/usersModel');

const jwt = require('jsonwebtoken')

//register user
routes.post('/register', async (req, res) => {
    const { name, email, password , phone , city , address } = req.body;
    try {
        if (!name || !email || !password || !phone || !city || !address) {
            return res.status(200).send({
                success: false,
                message: "All filed is required"
            })
        }
        let adduser = await User.create({
            name : name,
            email : email,
            password : password,
            phone : phone,
            city : city,
            address : address
        })
        return res.status(200).send({
            success : true,
            message : "User successfully register",
            user : adduser
        })
    } catch (err) {
        console.log(err);
        return false
    }
})

//login user
routes.post('/login',async(req,res)=>{
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(200).send({
                success : false,
                message : "Email and password not valid"
            })
        }
        let token = await jwt.sign({user : user},"rnw4",{expiresIn : '1hr'})
        return res.status(200).send({
            success  : true,
            message : "Token is here",
            token,
            user
        })
    }catch(err){
        console.log(err);
        return false;
    }
})


//user profile update
routes.get('/getprofile',async(req,res)=>{
    try{ 
        let id = req.query.id;
        console.log(id);
        let user = await User.findById(id);
        return res.status(200).send({
            success : true,
            message : "user fetch successfully",
            user
        })
    }catch(err){
        console.log(err);
        return false
    }
})

//user change profile update
routes.put('/updateprofile',async(req,res)=>{
    try{
        let id = req.query.id;
        const {name,phone,city,address} = req.body;
        let up = await User.findByIdAndUpdate(id,{
            name : name,
            phone : phone,
            city : city,
            address : address
        })
        return res.status(200).send({
            success : true,
            message : "Profile successfully changed",
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

//user change password
routes.put('/changepassword',async(req,res)=>{ 
    try{
        let id = req.query.id;
        const {password} = req.body;
        let up = await User.findByIdAndUpdate(id,{
            password : password
        })
        return res.status(200).send({
            success : true,
            message : "Password successfully changed",
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

module.exports = routes 