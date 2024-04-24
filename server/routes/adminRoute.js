const express = require('express');

const routes = express.Router();

const Category = require('../models/categoryModel')

const Product = require('../models/productModel')

const cloudinary = require('../config/cloudinaryConfig')

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const multer = require('multer')

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ecommerce',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }                                                              
}); 

let upload = multer({storage : storage}).single('image')




const { verifyToken } = require('../middleware/verifyToken');

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
            success : true,
            message : "Category successfully add",
            category : add
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
            success : true,
            message : "Category successfully fetch",
            category
        })
    } catch (err) {
        console.log(err);
        return false;
    }
})

//category view by admin side with token
routes.delete('/category/deletecategory',verifyToken,async(req,res)=>{
    try{
        let id = req.query.id;
        let data = await Category.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "Category successfully delete"
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

routes.get('/category/editcategory',verifyToken,async(req,res)=>{
    try{
        let id = req.query.id;
        let data = await Category.findById(id);
        return res.status(200).send({
            success : true,
            message : "Category fetch",
            singlecategory : data
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

routes.put('/category/updatecategory',verifyToken,async(req,res)=>{
    try{
        let id = req.query.id;
        let data = await Category.findByIdAndUpdate(id,{
            name : req.body.name
        })
        return res.status(200).send({
            success : true,
            message : "Category Successfully Update",
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

//update marketstatus by admin side

routes.put('/product/updatemarketstatus',verifyToken,async(req,res)=>{
    try{
        let id = req.query.id
        let status = req.body.mstatus; 
        console.log(status)
        let data = await Product.findByIdAndUpdate(id,{
            marketstatus : status,
        })

        
        return res.status(200).send({
            success : true,
            message : "Status successfully changed",
        })
    }catch(err){
        console.log(err);
        return false;
    }
})


//admin side product add 

routes.post('/product/addproduct',upload,verifyToken,async(req,res)=>{
    try{
        let res = await cloudinary.uploader.upload(req.file.path);
        console.log(res);
    }catch(err){
        console.log(err);
        return false; 
    }
})







module.exports = routes