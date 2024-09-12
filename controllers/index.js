const AuthenticationController = require("./AuthenticationController");
const DashboardController = require("./DashboardController");
const HomeController = require("./HomeController");
const CatalogueController = require("./CatalogueController");
const OrderController = require("./OrderController");
const ProductController = require("./ProductController");
const RegisterController = require("./RegisterController");
const ProfileController = require("./ProfileController");
const TransactionController = require("./TransactionController");

module.exports = {
  AuthenticationController,
  HomeController,
  RegisterController,
  ProductController,
  DashboardController,
  ProfileController,
  OrderController,
  CatalogueController,
  TransactionController,
};
