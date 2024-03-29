const express = require("express")

const routes = express.Router();

const Product = require('../models/productModel');

routes.get('/',async(req,res)=>{
    try{
        let product = await Product.find({});
        return res.status(200).send({
            success : true,
            message : "product successfully fetch",
            product
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

routes.post('/addproduct',async(req,res)=>{
   try{
    let insert = await Product.create({
        categoryId : req.body.category,
        name : req.body.name,
        price : req.body.price,
        qty : req.body.qty,
        description : req.body.description,
        image : req.body.image
    })
    return res.status(200).send({
        success : true,
        message : "Product successfully add",
        product : insert
    })
   }catch(err){
    console.log(err);
    return false;
   }
})

module.exports = routes