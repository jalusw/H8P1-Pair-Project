const { HashHelper } = require("../helpers");
const { User } = require("../models");

class AuthenticationController {
  static async login(_, res) {
    return res.render("pages/login", {
      title: "Login",
      data: {},
      errors: {},
    });
  }
  static async authenticate(req, res) {
    const { body } = req;
    const { email, password } = body;
    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw {
          name: "UserNotFound",
        };
      }

      if (!HashHelper.verify(password, user.password)) {
        throw {
          name: "WrongPassword",
        };
      }

      req.session.user = user.id;

      res.redirect("/");
    } catch (error) {
      switch (error.name) {
        case "UserNotFound":
          return res.render("pages/login", {
            title: "Login",
            errors: {
              email: {
                message:
                  "Sorry, we couldn’t find an account with that email. Please check and try again.",
              },
            },
            data: body,
          });
        case "WrongPassword":
          return res.render("pages/login", {
            title: "Login",
            errors: {
              password: {
                message:
                  "Oops! The password you entered is incorrect. Please try again.",
              },
            },
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

  static async logout(req, res) {
    req.session.destroy();
    return res.redirect("/");
  }
}

module.exports = AuthenticationController;
