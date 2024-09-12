const { ErrorPageHelper, AuthenticationHelper, ValidationErrorHelper } = require("../helpers");
const { User, Order } = require("../models");

class CartController {
  static async index(req, res, next) {
    try {
      const { id } = res.locals.user;
      const user = await User.withShoppingCart(id);
      res.send(user);
      // return res.render("pages/cart", { user });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async add(req, res, next) {
    try {
      const { body } = req;
      const { UserId } = res.locals.user;
      await Order.create({
        UserId,
        ...body,
      });
      req.flash("success", "Item added to your cart !");
      res.redirect("back");
    } catch (error) {
      switch (error.name) {
        case "SequelizeValidationError":
          const errors = ValidationErrorHelper.mapErrorByPath(error.errors);
          debugger;
    
          req.flash("success", ValidationError);
          return res.redirect("back");
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = CartController;
