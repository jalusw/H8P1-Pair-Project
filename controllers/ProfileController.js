const { ErrorPageHelper, DateHelper, StorageHelper, ValidationErrorHelper } = require("../helpers");
const { Biodata } = require("../models");

class ProfileController {
  static async profile(req, res) {
    try {
      return res.render("pages/profile", { title: "Profile", errors: {} });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async update(req, res) {
    try {
      const  user = res.locals?.user;
      const UserId  = user.id;

      const {
        file,
        body,
      } = req;

      let image =  user.Biodatum?.image;
      if(file?.filename){
        image = StorageHelper.generateUploadPath(file.filename);
      }

      if(!body?.birthDate){
        body.birthDate = null;
      }

      await Biodata.update(
        {
          image,
          ...body,
        },
        {
          where: {
            UserId,
          },
        },
      );

      req.flash('success', 'Your profile has been updated successfully');

      return res.redirect("back");
    } catch (error) {
      switch (error.name) {
        case "SequelizeValidationError":
          return res.render("pages/profile", {
            title: "Profile",
            errors: ValidationErrorHelper.mapErrorByPath(error.errors),
            data: {},
          });
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = ProfileController;
