const { Router } = require("express");
const { HomeController } = require("../controllers");

const router = Router();

/* GET home page. */
router.get("/", HomeController.index);

module.exports = router;
