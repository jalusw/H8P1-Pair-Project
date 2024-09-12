const { Router } = require("express");
const {
  AuthenticationMiddleware,
  MulterMiddleware,
} = require("../middlewares");
const {
  ProfileController,
  OrderController,
  HomeController,
  CatalogueController,
} = require("../controllers");
const CartController = require("../controllers/CartController");

const router = Router();

/* GET home page. */
router.get("/", HomeController.index);
router.get(
  "/profile",
  AuthenticationMiddleware.auth,
  ProfileController.profile,
);

router.post(
  "/profile",
  AuthenticationMiddleware.auth,
  MulterMiddleware().single("image"),
  ProfileController.update,
);

router.get("/catalogue", CatalogueController.index);
router.get("/catalogue/:id", CatalogueController.detail);

router.get("/cart", AuthenticationMiddleware.auth, CartController.index);
router.post("/cart", AuthenticationMiddleware.auth, CartController.add);
router.get(
  "/cart/:id/delete",
  AuthenticationMiddleware.auth,
  CartController.delete,
);

router.post(
  "/checkout",
  AuthenticationMiddleware.auth,
  OrderController.checkout,
);

router.get("/order", AuthenticationMiddleware.auth, OrderController.index);

module.exports = router;
