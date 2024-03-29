const express = require("express")

const routes = express.Router();

const Category = require('../models/categoryModel');

routes.get('/',(req,res)=>{
    res.send("hello done")
})

routes.post('/categoryAdd',async(req,res)=>{
    try{
        let insert = await Category.create({
            name : req.body.name
        })
        return res.status(200).send({
            success : true,
            message : "Category successfully add",
            category : insert
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

routes.get('/categoryView',async(req,res)=>{
    try{
        let category = await Category.find({});
        return res.status(200).send({
            success : true,
            message : "Record fetch successfully",
            category
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

module.exports = routes 