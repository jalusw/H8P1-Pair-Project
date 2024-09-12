const { ValidationErrorHelper, ErrorPageHelper } = require("../helpers");
const { User } = require("../models");

class RegisterController {
  static async register(req, res) {
    return res.render("pages/register", {
      title: "Register",
      data: {},
      errors: {},
    });
  }

  static async saveRegistration(req, res) {
    const { body } = req;
    try {
      await User.create(body);
      res.redirect("/login");
    } catch (error) {
      switch (error.name) {
        case "SequelizeValidationError":
          return res.render("pages/register", {
            title: "Register",
            errors: ValidationErrorHelper.mapErrorByPath(error.errors),
            data: body,
          });
      case "SequelizeUniqueConstraintError":
          return res.render("pages/register", {
            title: "Register",
            errors: ValidationErrorHelper.mapErrorByPath(error.errors),
            data: body,
          });
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = RegisterController;
