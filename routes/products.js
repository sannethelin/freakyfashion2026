const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const productsController = require("../controllers/productsController");


// MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/products");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


// PRODUKTER
router.get(
  "/product/:articleNumber",
  productsController.getProductDetails
);

router.get(
  "/category/:name",
  productsController.getCategory
);

router.get(
  "/search",
  productsController.search
);


// ADMIN
router.get(
  "/admin/products/index",
  productsController.getAdminProducts
);

router.get(
  "/admin/products/newproduct",
  productsController.getNewProductPage
);

router.post(
  "/add-product",
  upload.single("productPicture"),
  productsController.addProduct
);


// KATEGORIER
router.get(
  "/admin/products/categories",
  productsController.getAdminCategoriesPage
);

router.get(
  "/admin/products/newcategory",
  productsController.getNewCategoryPage
);

router.post(
  "/add-category",
  productsController.addCategory
);


module.exports = router;