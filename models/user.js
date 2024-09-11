"use strict";
const { Model } = require("sequelize");
const { HashHelper } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email is not allowed to be null",
          },
          notEmpty: {
            msg: "Oops! Looks like you forgot to enter your email.",
          },
          isEmail: {
            msg: "Please enter a valid email address, like example@example.com.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is not allowed to be null",
          },
          notEmpty: {
            msg: "Don't forget to enter a password!",
          },
          tooShort(value) {
            if (value.length < 8) {
              throw new Error("Password is too short");
            }
          },
        },
      },
      passwordConfirmation: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        set(value) {
          if (value == this.password) {
            this.password = value;
            this.setDataValue("passwordConfirmation", value);
          }
        },
        validate: {
          notNull: {
            msg: "Hmm, those passwords don't match. Try again!",
          },
        },
      },

      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(instance, _) {
          instance.password = HashHelper.generate(instance.dataValues.password);
          instance.role = "General";
        },
      },
    },
  );
  return User;
};
