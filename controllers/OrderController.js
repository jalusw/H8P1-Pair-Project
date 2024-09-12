const { ErrorPageHelper } = require("../helpers");
const { User, Order, Product } = require("../models");

class OrderController {
  static async index(req, res) {
    try {
      const { id } = res.locals.user;
      const { Products: products } = await User.withOrder(id);
      return res.render("pages/order", { products });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async checkout(req, res) {
    try {
      // do something ...
      const { body } = req;
      const { id } = res.locals.user;
      const { Products: products } = await User.withShoppingCart(id);
      products.forEach(async (product) => {
        await Product.update(
          {
            stock: product.stock - product.Order.quantity,
          },
          {
            where: {
              id: product.id,
            },
          },
        );
        await Order.update(
          {
            status: "paid",
            address: body.address,
          },
          {
            where: {
              id: product.Order.id,
            },
          },
        );
      });
      req.flash(
        "success",
        " Your payment was successful. Thanks for your purchase !",
      );
      res.redirect("back");
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = OrderController;
