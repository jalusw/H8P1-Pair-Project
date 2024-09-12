const { ErrorPageHelper } = require("../helpers");
const { Product, User } = require("../models");

class AdminOrderController {
  static async index(req, res, next) {
    try {
      const products = await Product.getInProgressOrder();
      return res.render("pages/admin-order", { products });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = AdminOrderController;
