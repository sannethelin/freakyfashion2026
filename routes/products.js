const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

// GET hämta produktdetaljer
router.get("/productDetails/:id", productsController.getProductDetails);

// POST lägg till produkt
router.post("/addProduct", productsController.addProduct);



module.exports = router;