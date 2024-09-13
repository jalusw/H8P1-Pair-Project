const { ErrorPageHelper } = require("../helpers");
const { User } = require("../models");

class AdminTransactionController {
  static async index(req, res, next) {
    try {
      const { id } = res.locals.user;
      const users = await User.allWithTransaction(id);
      return res.render("pages/admin-transaction", { users });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = AdminTransactionController;
