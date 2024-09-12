'use strict';
const {
  Model
} = require('sequelize');
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
  }
  Order.init({
    status: DataTypes.STRING,
    note: DataTypes.STRING,
    quantity: { 
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: "Quantity can’t be less than 0. Please enter a valid amount."
        }
      }
    },
    address: DataTypes.STRING,
    price: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    hooks: {
      beforeCreate(instance,_){
        instance.status = "pending";
      }
    }
  });
  return Order;
};