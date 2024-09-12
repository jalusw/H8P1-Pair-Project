const { ErrorPageHelper } = require("../helpers");
const { Category, Product, Sequelize } = require("../models");

class CatalogueController {
  static async index(req, res) {
    try {
      const { query } = req;
      const filterCategory = {};
      const filterProduct = {
        name: {
          [Sequelize.Op.iLike]: `%${query.search ?? ""}%`,
        },
        price: {
          [Sequelize.Op.gt]: Number(query.minimum || 0),
          [Sequelize.Op.lt]: Number(query.maximum || 100000000000000),
        },
      };

      if (query.category) {
        filterCategory.id = {
          [Sequelize.Op.eq]: query.category,
        };
      }

      const products = await Product.findAll({
        include: {
          model: Category,
          where: filterCategory,
        },
        where: filterProduct,
        limit: 20,
        order: [["createdAt", "DESC"]],
      });
      const categories = await Category.findAll();
      return res.render("pages/catalogue", { categories, products, query });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async detail(req, res) {
    try {
      const { params } = req;
      const { id } = params;
      const product = await Product.findByPk(id, {
        include: Category
      });
      return res.render("pages/product", {product});
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

}

module.exports = CatalogueController;
