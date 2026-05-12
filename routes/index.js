const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productsController");


// index via controller
router.get("/", productsController.getHomePage);



module.exports = router;