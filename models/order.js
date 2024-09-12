"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    get priceInRupiah() {
      const { CurrencyHelper } = require("../helpers");
      return `Rp. ${CurrencyHelper.toIDR(this.price)},00`;
    }

    get totalPriceInRupiah() {
      const { CurrencyHelper } = require("../helpers");
      return `Rp. ${CurrencyHelper.toIDR(this.price * this.quantity)},00`;
    }
  }
  Order.init(
    {
      status: DataTypes.STRING,
      note: DataTypes.STRING,
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Please provide quantity",
          },
          min: 0,
          async isStockAvail(value) {
            const product = await sequelize.models.Product.findByPk(
              this.ProductId,
            );

            if (value > product.stock) {
              throw new Error("Oops! We don’t have enough in stock");
            }
          },
        },
      },
      address: DataTypes.STRING,
      price: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
      hooks: {
        async beforeCreate(instance, _) {
          const product = await sequelize.models.Product.findByPk(
            instance.ProductId,
          );
          instance.status = "pending";
          instance.price = product.price;
        },
      },
    },
  );
  return Order;
};

