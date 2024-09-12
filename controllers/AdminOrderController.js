const { ErrorPageHelper } = require("../helpers");
const { Order, Product, User } = require("../models");

class AdminOrderController {
  static async index(_, res) {
    try {
      const users = await User.allWithOrderInProgress();
      return res.render("pages/admin-order", { users });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async process(req, res) {
    try {
      const { id } = req.params;
      await Order.update(
        {
          status: "delivered",
        },
        {
          where: {
            id,
          },
        },
      );
      req.flash("success", "Sent to delivery");
      return res.redirect("back");
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = AdminOrderController;
