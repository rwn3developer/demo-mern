const express = require("express")

const routes = express.Router();

const Product = require('../models/productModel');

const { verifyToken, isAdmin } = require('../middleware/verifyToken')

routes.get('/', async (req, res) => {
  const { page = 1, limit = 3, category, price, keyword, marketstatus } = req.query;
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

  if (marketstatus) {
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


//admin product view api
routes.get('/adminviewproduct', verifyToken,isAdmin, async (req, res) => {
  try {

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;

    let product = await Product.find({})
      .skip(skip)
      .limit(limit)

    const totalCount = await Product.find({});

    return res.status(200).send({
      success: true,
      message: "Product successfully fetch",
      products: product,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount.length / limit),
    })
  } catch (err) {
    console.log(err);
    return false;
  }
})


//product like by user
routes.put('/userLikeProduct', verifyToken, async (req, res) => {
  try {
    let id = req.body.postId;
    let likesuser = await Product.findByIdAndUpdate(id, {
      $push: {
        likes: req.user.user._id
      }
    })
    return res.status(200).send({
      success: true,
      message: "Like Successfully",
      likes: likesuser
    })
  } catch (err) {
    console.log(err);
    return false;
  }
})

//product dislike by user
routes.put('/userDisLikeProduct', verifyToken, async (req, res) => {
  try {
    let id = req.body.postId;
    let likesuser = await Product.findByIdAndUpdate(id, {
      $pull: {
        likes: req.user.user._id
      }
    })
    return res.status(200).send({
      success: true,
      message: "Unlike Successfully",
      likes: likesuser
    })
  } catch (err) {
    console.log(err);
    return false;
  }
})







module.exports = routes