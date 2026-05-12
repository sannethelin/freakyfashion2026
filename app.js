// Importera nödvändiga moduler
var createError = require("http-errors");
const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var productsRouter = require("./routes/products");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);
app.set("layout", "layouts/main");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Visa alltid titel Freaky Fashion som backup
app.use((req, res, next) => {
  res.locals.title = "Freaky Fashion";
  next();
});

// Gör filerna i /public synliga från webbläsaren
app.use(express.static(path.join(__dirname, "public")));

// MODEL
const Product = require("./models/products");

// MENU
app.use((req, res, next) => {
  Product.getAllCategories((err, categories) => {
    if (err || !categories) {
      console.error("Kunde inte hämta kategorier:", err);
      res.locals.menu = [];
      return next();
    }

    res.locals.menu = categories.map((c) => ({
      name: c.name,
      link: `/category/${c.name}`,
    }));

    next();
  });
});

// Routes
app.use("/", indexRouter);
app.use("/", productsRouter);

// 404 OBS!!! skall ligga efter alla routes
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;