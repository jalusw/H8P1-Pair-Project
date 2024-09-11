var express = require("express");
const HomeController = require("../controllers/HomeController");
var router = express.Router();

/* GET home page. */
router.use("/", HomeController.index);

module.exports = router;
