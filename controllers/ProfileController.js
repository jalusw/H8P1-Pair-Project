const { ErrorPageHelper } = require("../helpers");
const {} = require("../models");

class ProfileController {
  static async profile(req, res) {
    try {
      return res.render("pages/profile", { title: "Profile" });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async update(req,res){
    try {
      return res.render("pages/profile", { title: "Profile" });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }

  }
}

module.exports = ProfileController;
