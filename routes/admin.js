const { Router } = require("express");
const { ProductController, DashboardController } = require("../controllers");
const { AuthenticationMiddleware } = require("../middlewares");
const AdminOrderController = require("../controllers/AdminOrderController");

const router = Router();

// /admin/
router.get(
  "/",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  DashboardController.index,
);

// /admin/products
router.get(
  "/products",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  ProductController.index,
);

router.get(
  "/products/add",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  ProductController.addProduct,
);

router.get(
  "/orders",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  AdminOrderController.index,
);

module.exports = router;
