const { ErrorPageHelper } = require("../helpers");
const {} = require("../models");

class TemplateController {
  static async handler(req, res, next) {
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

module.exports = TemplateController;
