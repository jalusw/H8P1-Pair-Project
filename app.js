require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const session = require("express-session");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const app = express();

app.locals.title = process.env.APP_NAME || "E Commerce";
app.locals.defaultMeta = {
  description: "This is the default description",
  keywords: "e commerce, jual, beli",
};
app.locals.mode = process.env.NODE_ENV;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "Hmm???",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true },
  }),
);

app.use("/", indexRouter);
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
