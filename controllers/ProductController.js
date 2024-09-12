const { ErrorPageHelper } = require("../helpers");
const { Product, Category } = require("../models");

class ProductController {
  static async index(req, res, next) {
    try {
      // do something ...
      const data = await Product.findAll()
      return res.render("pages/products", {data});
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async addProduct(req, res, next) {
    try {
      // do something ...
      const data = await Product.findAll()
      // res.send(data);
      return res.render("pages/addProduct", {data});
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

}



module.exports = ProductController;