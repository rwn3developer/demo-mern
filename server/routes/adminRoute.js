const express = require('express');

const routes = express.Router();

const Category = require('../models/categoryModel')

const { verifyToken } = require('../middleware/verifyToken');

//category add by admin side with token
routes.get('/category/addcategory', verifyToken, async (req, res) => {
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
            message : "Category successfully add",
            category
        })
    } catch (err) {
        console.log(err);
        return false;
    }
})





module.exports = routes