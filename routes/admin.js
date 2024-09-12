const { Router } = require("express");
const { ProductController, DashboardController } = require("../controllers");
const {
  AuthenticationMiddleware,
  MulterMiddleware,
} = require("../middlewares");
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

router.post(
  "/products/add",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  MulterMiddleware().single("image"),
  ProductController.postProduct,
);

router.get(
  "/products/:id/edit",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  ProductController.getEditProduct,
);

router.post(
  "/products/:id/edit",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  MulterMiddleware().single("image"),
  ProductController.postEditProduct,
);

router.get(
  "/products/:id/delete",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  ProductController.deleteProduct,
);

router.get(
  "/products/:id/restock",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  ProductController.restockProduct,
);

router.get(
  "/orders",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  AdminOrderController.index,
);
router.get(
  "/orders/:id/process",
  AuthenticationMiddleware.auth,
  AuthenticationMiddleware.admin,
  AdminOrderController.process,
);

module.exports = router;
