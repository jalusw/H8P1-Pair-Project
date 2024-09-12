const { ErrorPageHelper } = require("../helpers");
const { User, Order } = require("../models");

class OrderController {
  static async index(req, res) {
    try {
      // do something ...
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
      products.forEach(async ({ Order: order }) => {
        await Order.update(
          {
            status: "paid",
            address: body.address,
          },
          {
            where: {
              id: order.id,
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
