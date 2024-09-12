const { Router } = require("express");
const { ProductController, DashboardController } = require("../controllers");
const { AuthenticationMiddleware } = require("../middlewares");

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
)

router.post(
  "/products/add",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  ProductController.postProduct,
)

router.get(
  "/products/:id/edit",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  ProductController.getEditProduct,
)

router.post(
  "/products/:id/edit",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  ProductController.postEditProduct,
)

router.get(
  "/products/:id/delete",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  ProductController.deleteProduct,
)

router.get(
  "/products/:id/restock",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  ProductController.restockProduct,
)
module.exports = router;
