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
}

class ProductAdd {
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
}

module.exports = {ProductController, ProductAdd};
