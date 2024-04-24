// cloudinaryConfig.js

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'coderking',
  api_key: '894478555391115',
  api_secret: 'gNOzQfa7BRLtN0MibIdiZHyfQnU'
});

module.exports = cloudinary;
