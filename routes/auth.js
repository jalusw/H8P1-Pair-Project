const { Router } = require("express");
const {
  AuthenticationController,
  RegisterController,
} = require("../controllers");
const { AuthenticationMiddleware } = require("../middlewares");

const router = Router();

/* Register page. */
router.get(
  "/register",
  AuthenticationMiddleware.guest,
  RegisterController.register,
);

/* Register and save user */
router.post(
  "/register",
  AuthenticationMiddleware.guest,
  RegisterController.saveRegistration,
);

/* Login page. */
router.get(
  "/login",
  AuthenticationMiddleware.guest,
  AuthenticationController.login,
);

/* Authenticate */
router.post(
  "/login",
  AuthenticationMiddleware.guest,
  AuthenticationController.authenticate,
);

router.post("/logout", AuthenticationController.logout);

module.exports = router;
