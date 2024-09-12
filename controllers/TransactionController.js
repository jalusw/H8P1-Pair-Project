const { ErrorPageHelper } = require("../helpers");
const { User } = require("../models");

class TransactionController {
  static async index(req, res, next) {
    try {
      const { id } = res.locals.user;
      const { Products: products } = await User.withHistoryTransaction(id);
      return res.render("pages/transaction", { products });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = TransactionController;
