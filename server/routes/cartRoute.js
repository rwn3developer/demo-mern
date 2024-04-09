const express = require('express');

const routes = express.Router();

const Product = require('../models/productModel')
const Cart = require('../models/cartsModel')

const {verifyToken} = require('../middleware/verifyToken');

//product single record fetch

routes.get('/product-single-record',verifyToken,async(req,res)=>{
    let id = req.query.id; 
    try{
        let single = await Product.findById(id);
        return res.status(200).send({
            success : true,
            message : "Record fetch successfully",
            product : single
        })
    }catch(err){
        console.log(err);
        return false
    }
})

//add to cart api
routes.post('/addcarts',async(req,res)=>{
    try{
        const {categoryId , productId , name , price , qty , description , image ,userId } = req.body
        let cart = await Cart.create({
            categoryId , productId , name , price , qty , description , image ,userId
        })
        return res.status(200).send({
            success : true,
            message : "Product successfully add to cart",
            cart
        })
    }catch(err){
        console.log(err);
        return false;
    }
    
})

module.exports = routes



