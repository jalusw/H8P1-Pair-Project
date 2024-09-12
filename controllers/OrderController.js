const { ErrorPageHelper } = require("../helpers");
const {} = require("../models");

class OrderController {
  static async index(req, res, next) {
    try {
      // do something ...
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = OrderController;
