const { ErrorPageHelper, AvatarHelper, StorageHelper } = require("../helpers");
const { Product, Category } = require("../models");

class ProductController {
  static async index(req, res, next) {
    try {
      // do something ...
      const data = await Product.findAll({
        include: Category,
      });
      return res.render("pages/products", { data });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async addProduct(req, res, next) {
    try {
      // do something ...
      let categories = await Category.findAll();

      return res.render("pages/addProduct", { categories });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async postProduct(req, res, next) {
    const { body, file } = req;

    let image = "";

    if (file?.filename) {
      image = StorageHelper.generateUploadPath(file.filename);
    }

    try {
      await Product.create({
        image,
        ...body,
      });
      req.flash("success", "Product added succesfully");
      return res.redirect("/admin/products");
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async getEditProduct(req, res, next) {
    let { id } = req.params;
    try {
      let categories = await Category.findAll();
      let product = await Product.findByPk(id);
      return res.render("pages/editProduct", { product, categories });
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async postEditProduct(req, res) {
    const { params, body, file } = req;
    const { id } = params;
    try {
      if (file?.filename) {
        body.image = StorageHelper.generateUploadPath(req.file.filename);
      }
      await Product.update(body, { where: { id } });

      req.flash("success", "Product edit succesfully");
      return res.redirect("/admin/products");
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      let { id } = req.params;
      // do something ...
      const instance = await Product.findByPk(id);
      await instance.destroy({ where: { id } });

      req.flash("success", "Product deleted");
      return res.redirect("/admin/products");
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async restockProduct(req, res, next) {
    let { id } = req.params;
    try {
      // do something ...
      const instance = await Product.findByPk(id);
      await instance.increment("stock");
      return res.redirect("/admin/products");
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }
}

module.exports = ProductController;
