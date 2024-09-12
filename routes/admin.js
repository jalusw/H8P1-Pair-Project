const { Router } = require("express");
const {
  ProductController,
  DashboardController,
  AdminTransactionController,
} = require("../controllers");
const {
  AuthenticationMiddleware,
  MulterMiddleware,
} = require("../middlewares");
const AdminOrderController = require("../controllers/AdminOrderController");

const router = Router();

router.use("/", AuthenticationMiddleware.auth);
router.use("/", AuthenticationMiddleware.admin);

// /admin/
router.get("/", DashboardController.index);

// /admin/products
router.get(
  "/products",
  ProductController.index,
);

router.get(
  "/products/add",
  ProductController.addProduct,
);

router.post(
  "/products/add",
  MulterMiddleware().single("image"),
  ProductController.postProduct,
);

router.get(
  "/products/:id/edit",
  ProductController.getEditProduct,
);

router.post(
  "/products/:id/edit",
  MulterMiddleware().single("image"),
  ProductController.postEditProduct,
);

router.get(
  "/products/:id/delete",
  ProductController.deleteProduct,
);

router.get(
  "/products/:id/restock",
  ProductController.restockProduct,
);

router.get(
  "/orders",
  AdminOrderController.index,
);

router.get(
  "/orders/:id/process",
  AdminOrderController.process,
);

router.get("/transactions", AdminTransactionController.index);

module.exports = router;
