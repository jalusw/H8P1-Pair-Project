const { ValidationErrorHelper } = require("../helpers");
const { User } = require("../models");

class RegisterController {
  static async register(req, res, next) {
    return res.render("pages/register", {
      title: "Register",
      data: {},
      errors: {},
    });
  }

  static async saveRegistration(req, res, next) {
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
        default:
          return res.status(500).render("error", {
            error: {
              status: "500 Internal Server Error",
              stack: error,
            },
            message:
              "Oops! Something went wrong on our end. Please try again later",
          });
      }
    }
  }
}

module.exports = RegisterController;
