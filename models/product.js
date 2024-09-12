"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category)
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
      name: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    },
  );
  return Product;
};
