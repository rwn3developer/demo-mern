const express = require("express")

const routes = express.Router();

const Product = require('../models/productModel');

const mongoose  = require('mongoose')

routes.get('/', async (req, res) => {
  const { page = 1, limit = 3, category, price , keyword, marketstatus } = req.query; 
  const skip = (page - 1) * limit;
  const filter = {};

  //convert to string to array
  let p = price.split(',');
  
  //convert to string to array 
  const categoryIdArray = category.split(',').map(id => id.trim()); 

  if (category) {
      filter.categoryId = categoryIdArray
  }

  if (price) {
    filter.price = { $gte: p[0], $lte: p[1] };
  }
      
  if (keyword) {
    filter.name = { $regex: keyword, $options: 'i' };
  }

  if(marketstatus){
    filter.marketstatus = marketstatus
  }

  try {
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit));
    const totalCount = await Product.countDocuments(filter);

    res.json({
      products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

routes.post('/addproduct', async (req, res) => {
  try {
    let insert = await Product.create({
      categoryId: req.body.category,
      name: req.body.name,
      price: req.body.price,
      qty: req.body.qty,
      description: req.body.description,
      image: req.body.image
    })
    return res.status(200).send({
      success: true,
      message: "Product successfully add",
      product: insert
    })
  } catch (err) {
    console.log(err);
    return false;
  }
})



module.exports = routes