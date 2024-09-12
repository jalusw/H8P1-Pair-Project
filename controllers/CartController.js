const {
  ErrorPageHelper,
  ValidationErrorHelper,
  CurrencyHelper,
} = require("../helpers");
const { User, Order } = require("../models");

class CartController {
  static async index(req, res) {
    try {
      const { id } = res.locals.user;
      const { Products: products } = await User.withShoppingCart(id);
      const totalPayment = CurrencyHelper.toIDR(
        products.reduce(
          (current, product) =>
            current + product.Order.price * product.Order.quantity,
          0,
        ),
      );
      return res.render("pages/cart", {
        products,
        totalPayment,
        title: "Cart",
      });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async add(req, res) {
    try {
      const { body } = req;
      const { id: UserId } = res.locals.user;
      const [order, created] = await Order.findOrCreate({
        where: {
          UserId,
          ProductId: body.ProductId,
        },
        defaults: {
          UserId,
          ...body,
        },
      });
      if (!created) {
        order.update(body);
      }
      req.flash("success", "Item added to your cart !");
      res.redirect("back");
    } catch (error) {
      switch (error.name) {
        case "SequelizeValidationError":
          req.flash(
            "error",
            ValidationErrorHelper.firstError(error.errors).message,
          );
          return res.redirect("back");
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async delete(req, res) {
    try {
      const { params } = req;
      const { id } = params;
      await Order.destroy({
        where: {
          id,
        },
      });
      req.flash("success", "Item deleted from your cart !");
      res.redirect("back");
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = CartController;
