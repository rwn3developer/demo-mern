const express = require('express');

const port = 8000;

const app = express();

const cors = require('cors'); 


const {connectDb} = require('./config/db'); 

//database call function
connectDb()
  
app.use(cors());

app.use(express.json());

app.use(express.urlencoded()) 


app.use('/category',require('./routes/categoryRoute'))  
app.use('/products',require('./routes/productRoute')); 
app.use('/users',require('./routes/userRoute'));
app.use('/carts',require('./routes/cartRoute')); 
app.use('/payments',require('./routes/paymentRoute')); 

//admin route
app.use('/admin',require('./routes/adminRoute'));


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    } 
    console.log(`server is start on port :- ${port}`);  
})