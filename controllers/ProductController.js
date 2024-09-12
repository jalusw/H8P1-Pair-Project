const { ErrorPageHelper } = require("../helpers");
const { Product, Category } = require("../models");

class ProductController {
  static async index(req, res, next) {
    try {
      // do something ...
      const data = await Product.findAll({
        include: Category
      })
      return res.render("pages/products", {data});
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
      let data = await Product.findAll({
        include: Category
      })

      // res.send(data);
      return res.render("pages/addProduct", {data});
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }


  static async postProduct(req, res, next) {
    let {name, stock, price, image, description, CategoryId}= req.body
    try {
      // do something ...
      await Product.create({name, stock, price, image, description, CategoryId})
      return res.redirect('/products');
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async getEditProduct(req, res, next) {
    let {id:id} = req.params
    try {
      // do something ...
      let data= await Product.findByPk(id)
      return res.render("pages/editProduct", {data});
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async postEditProduct(req, res, next) {
    let {id} = req.params
    let {name, stock, price, image, description, CategoryId}= req.body
    try {
      // do something ...
      await Product.update({name, stock, price, image, description, CategoryId},{where:{id:id}})
      return res.redirect('/products');
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async deleteProduct(req, res, next) {
    
    try {
      let {id} = req.params
      // do something ...
      const instance = await Product.findByPk(id)
      await instance.destroy({where:{id}})
      return res.redirect('/admin/products');
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

  static async restockProduct(req, res, next) {
    let {id} = req.params
    try {
      // do something ...
      const instance = await Product.findByPk(id)
      await instance.increament('stock')
      return res.redirect('/products')
    } catch (error) {
      switch (error.name) {
        default:
          return ErrorPageHelper.internalServerError(error, res);
      }
    }
  }

}



module.exports = ProductController;
