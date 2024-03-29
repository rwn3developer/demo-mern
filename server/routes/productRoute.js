const express = require("express")

const routes = express.Router();

const Product = require('../models/productModel');

routes.get('/',(req,res)=>{
    res.send("hello done")
})

module.exports = routes