"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      this.hasOne(models.Biodata);
      this.belongsToMany(models.Product, { through: models.Order });
    }

    static async withShoppingCart(id) {
      return await this.findByPk(id, {
        include: {
          model: sequelize.models.Product,
          through: {
            attributes: [
              "quantity",
              "note",
              "address",
              "id",
              "price",
              "status",
            ],
            where: {
              status: "pending",
            },
          },
        },
      });
    }

    static async withOrder(id) {
      return await this.findByPk(id, {
        include: {
          model: sequelize.models.Product,
          through: {
            attributes: [
              "quantity",
              "note",
              "address",
              "id",
              "price",
              "status",
            ],
            where: {
              status: {
                [Op.in]: ["paid", "delivered"],
              },
            },
          },
        },
      });
    }

    get isAdmin() {
      return this.role == "Admin";
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
          async isUnique(email) {
            if (await User.findOne({ where: { email } })) {
              throw new Error("Your email was taken by someone.");
            }
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
          const { HashHelper } = require("../helpers");
          instance.password = HashHelper.generate(instance.dataValues.password);
          instance.role = "General";
        },
        afterCreate(instance, _) {
          const { AvatarHelper } = require("../helpers");
          sequelize.models.Biodata.create({
            image: AvatarHelper.generate(instance.email.split("@")[0]),
            UserId: instance.id,
          });
        },
      },
    },
  );
  return User;
};
