const {} = require("../models");

class HomeController {
  static async index(req, res) {
    return res.render("pages/index", { title: "Home" });
  }
}

module.exports = HomeController;
