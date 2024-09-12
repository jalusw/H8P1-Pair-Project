"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category);
      // define association here
      this.belongsTo(models.Category);
      this.belongsToMany(models.User, { through: models.Order });
    }

    get priceInRupiah() {
      const { CurrencyHelper } = require("../helpers");
      return `Rp ${CurrencyHelper.toIDR(this.price)},00`;
    }

    static async getInProgressOrder() {
      return await this.findAll({
        include: {
          model: sequelize.models.User,
          through: {
            where: {
              status: "paid",
            },
          },
          required: true,
        },
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please provide the product name",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Please prove the stock",
          },
          min:0
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Please prove the stock",
          },
          min: 0
        },
      },
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      CategoryId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Please pick a category",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    },
  );
  return Product;
};
