const {} = require("../models");

class HomeController {
  static index(req, res, next) {
    res.render("index", { title: "Home" });
  }
}

module.exports = HomeController;
