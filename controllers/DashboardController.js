const { ErrorPageHelper } = require("../helpers");
const {} = require("../models");

class DashboardController {
  static async index(req, res, next) {
    try {
      // do something ...
      return res.render("pages/dashboard");
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = DashboardController;
