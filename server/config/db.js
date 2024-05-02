const mongoose = require('mongoose')

const connectDb = async () => {
  try{
    const con = await mongoose.connect(`mongodb+srv://rwnmilan:rwnmilan@cluster0.tr84nrb.mongodb.net/bestmernecommerce`);
    console.log(`Connect Mongodb ${con.connection.host}`);
  } catch(err){
    console.log(`Error in Mongodb ${err}`);
  } 
}

module.exports = {
    connectDb
}