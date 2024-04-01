const express = require("express")

const routes = express.Router();

const Product = require('../models/productModel');

routes.get('/', async (req, res) => {
  try{
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);


  // Calculate the start and end indexes for the requested page 
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Slice the products array based on the indexes
  let product = await Product.find({});

  const paginatedProducts = await product.slice(startIndex, endIndex); 

  // Calculate the total number of pages
  const totalPages = Math.ceil(product.length / limit);

  // Send the paginated products and total pages as the API response
  res.status(200).send({ 
    product: paginatedProducts, 
    totalPages 
  });

  }catch(err){
      console.log(err);
      return false;
  }

})

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

//price and category wise filter product
routes.post('/filterProduct', async (req, res) => {
  try {
    const { checked, radio, search } = req.body;
    // console.log(req.body);
    let args = {};
    if (checked.length > 0) args.categoryId = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    if (search) {
      args.name = { $regex: search, $options: 'i' }
    }
    const products = await Product.find(args);
    res.json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      err,
      message: "Error in Filter",
    });
  }
})

module.exports = routes