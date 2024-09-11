const {} = require("../models");

class HomeController {
  static index(_, res) {
    res.render("pages/index", { title: "Home" });
  }
}

module.exports = HomeController;
