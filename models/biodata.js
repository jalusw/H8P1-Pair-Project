"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }

    get birthDateInputFormatted() {
      const { DateHelper } = require("../helpers");
      if (!this.birthDate) return null;
      return DateHelper.formatDateInputValue(this.birthDate);
    }

    get fullName() {
      return `${this.firstName || "-"} ${this.lastName || "-"}`;
    }
  }
  Biodata.init(
    {
      image: DataTypes.STRING,
      firstName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Don't forget to put your first name",
          },
        },
      },
      lastName: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthDate: {
        type: DataTypes.DATE,
        validate: {
          isBefore: {
            args: "2007-01-01",
            msg: "Too young !",
          },
        },
      },
      address: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Biodata",
    },
  );
  return Biodata;
};
