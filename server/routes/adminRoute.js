const express = require('express');

const routes = express.Router();

const Category = require('../models/categoryModel')

const Product = require('../models/productModel')

const cloudinary = require('../config/cloudinaryConfig')

const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Uploads will be stored in the 'uploads' directory
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname); // Use the original file name as the filename
//     }
//   });

  const storage = multer.diskStorage({});
  
const upload = multer({ storage: storage }).single('image'); 

const { verifyToken } = require('../middleware/verifyToken');

//category operation

//category add by admin side with token
routes.post('/category/addcategory', verifyToken, async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(200).send({
                success: false,
                message: "Name is required"
            })
        }
        let add = await Category.create({
            name: req.body.name
        })
        return res.status(200).send({
            success: true,
            message: "Category successfully add",
            category: add
        })
    } catch (err) {
        console.log(err);
        return false;
    }
})

//category view by admin side with token
routes.get('/category/viewcategory', verifyToken, async (req, res) => {
    try {
        let category = await Category.find({});

        return res.status(200).send({
            success: true,
            message: "Category successfully fetch",
            category
        })
    } catch (err) {
        console.log(err);
        return false;
    }
})

//category view by admin side with token
routes.delete('/category/deletecategory', verifyToken, async (req, res) => {
    try {
        let id = req.query.id;
        let data = await Category.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Category successfully delete"
        })
    } catch (err) {
        console.log(err);
        return false;
    }
})

//single category get by admin with token
routes.get('/category/editcategory', verifyToken, async (req, res) => {
    try {
        let id = req.query.id;
        let data = await Category.findById(id);
        return res.status(200).send({
            success: true,
            message: "Category fetch",
            singlecategory: data
        })
    } catch (err) {
        console.log(err);
        return false;
    }
})

//category edit by admin with token
routes.put('/category/updatecategory', verifyToken, async (req, res) => {
    try {
        let id = req.query.id;
        let data = await Category.findByIdAndUpdate(id, {
            name: req.body.name
        })
        return res.status(200).send({
            success: true,
            message: "Category Successfully Update",
        })
    } catch (err) {
        console.log(err);
        return false;
    }
})


//product operation

//update marketstatus by admin side
routes.put('/product/updatemarketstatus', verifyToken, async (req, res) => {
    try {
        let id = req.query.id
        let status = req.body.mstatus;
        let data = await Product.findByIdAndUpdate(id, {
            marketstatus: status,
        })


        return res.status(200).send({
            success: true,
            message: "Status successfully changed",
        })
    } catch (err) {
        console.log(err);
        return false;
    }
})


//admin side product add with token
routes.post('/product/addproduct', upload,verifyToken, async (req, res) => {
    try {
        const { category, name, image, price, description, marketstatus } = req.body;

        let imageUrl = await cloudinary.uploader.upload(req.file.path);

        let add = await Product.create({
            categoryId: category,
            name: name,
            price: price,
            description: description,
            image: imageUrl.secure_url,
            public_id : imageUrl.public_id,
            marketstatus: marketstatus
        })
        return res.status(200).send({
            success: true,
            message: "Product successfully add",
            product: add
        })
    } catch (err) {
        console.log(err);
        return false;
    }
})

//delete product by admin with token
routes.delete('/product/deleteproduct', verifyToken, async (req, res) => {
    try {
        let id = req.query.id
        const record = await Product.findById(id);
        if(!record){
            return res.status(404).send({
                        success: false,
                        message: "Product not found"
                    })
            }

            await cloudinary.uploader.destroy(record.public_id)
            await Product.findByIdAndDelete(id);
            return res.status(200).send({
                success : true,
                message : "Product successfully delete"
            })
    } catch (err) {
        console.log(err);;
        return false;
    }
})


//singel product by admin with token
routes.get('/product/fetchsingleproduct',verifyToken,async(req,res)=>{
    try{
        let id = req.query.id;
        let product = await Product.findById(id).populate('categoryId');
        console.log(product);
        return res.status(200).send({
            success : true,
            message : 'record fetch successfully',
            product : product
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

//update product by admin with token
routes.put('/product/updateproduct', verifyToken, async (req, res) => {
    try {
        let id = req.query.id;
        const { category, name, image, price, description, marketstatus } = req.body;
        // console.log(req.file);
        if (req.file) {
    
        } else {

        }
    } catch (err) {
        console.log(err);
        return false;
    }
})






module.exports = routes