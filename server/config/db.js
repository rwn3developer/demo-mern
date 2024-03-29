const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/demo-mern");

const db = mongoose.connection;

db.on('connected',(err)=>{
    if(err){
        console.log(`not connectd`);
        return false
    }
    console.log(`DB is conected`);
})

module.exports = db;