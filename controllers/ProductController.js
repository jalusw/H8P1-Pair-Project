const { ErrorPageHelper } = require("../helpers");
const {} = require("../models");

class ProductController {
  static async index(req, res, next) {
    try {
      // do something ...
      return res.render("pages/products");
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = ProductController;
