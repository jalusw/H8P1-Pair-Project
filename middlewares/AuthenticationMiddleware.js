const { AuthenticationHelper } = require("../helpers");
class AuthenticationMiddleware {
  static async session(req, res, next) {
    res.locals.user = null;
    if (req.session && req.session.user) {
      const user = await AuthenticationHelper.user(req);
      res.locals.user = user;
    }
    next();
  }

  static guard(req, res, next) {
    if (req.session && req.session.user) {
      next();
    }

    return res.status(401).render("error", {
      error: {
        status: "401 Unauthorized",
        stack: "",
      },
      message:
        "Sorry, you don’t have permission to access this page. Please log in or contact support for help.",
    });
  }
  static auth(req, res, next) {
    if (req.session && req.session.user) {
      return next();
    }

    return res.redirect("/login");
  }

  static guest(req, res, next) {
    if (req.session && !req.session.user) {
      return next();
    }
    return res.redirect("/");
  }
}

module.exports = AuthenticationMiddleware;
