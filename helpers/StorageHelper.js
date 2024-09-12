require("dotenv").config();

const fs = require('fs')
const path = require("path");

const uploadLocation = "uploads";

class StorageHelper{
  static  generateUploadPath(filename){
    return `/${uploadLocation}/${filename}`;
  }

  static unlink(filename){
    fs.unlink(path.resolve(path.join(__dirname,"..","public/uploads",filename)),() => {});
  }
}

module.exports = StorageHelper;