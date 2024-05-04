const mongoose = require('mongoose');

const prouctSchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    public_id : {
        type : String,
        required : true
    },
    marketstatus : {
        type : String,
        required : true
    },
    likes : [
        {type : mongoose.Schema.Types.ObjectId,ref : "user"}
    ]
})

const product = mongoose.model('product',prouctSchema);

module.exports = product;