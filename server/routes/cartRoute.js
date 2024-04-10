const express = require('express');

const routes = express.Router();

const Product = require('../models/productModel')
const Cart = require('../models/cartsModel')
// const User = require('../models/usersModel')

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
routes.post('/addcarts',verifyToken,async(req,res)=>{
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


//perticular user wise cart data show
routes.get('/usercart',verifyToken,async(req,res)=>{
    try{
        let userid = req.query.userId;
        let carts = await Cart.find({userId : userid});
        return res.status(200).send({
            success : true,
            message : "User fetch successfully",
            carts
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

//cart delete item
routes.delete('/deletecart',verifyToken,async(req,res)=>{
    try{
        let id = req.query.id;
        let data = await Cart.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "Record delete in cart"
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

module.exports = routes



