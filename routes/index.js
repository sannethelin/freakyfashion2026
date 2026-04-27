// Importera de nödvändiga modulerna
const path = require("path");  // För hantering av filvägar
const sqlite3 = require("sqlite3").verbose(); // För att arbeta med SQLite-databasen
const express = require('express'); // För Express-frameworket
const router = express.Router(); // Skapar en Express-router
const addProduct = require("../db/utilities/add-product"); // Importerar funktionen för att lägga till en produkt i databasen


const dbPath = path.join(__dirname, '../db/utilities/freakyfashion.db');

// Öppna sökvägen till databasen 
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Kunde inte ansluta till databasen:", err.message);
  } else {
    console.log("Databas ansluten");
  }
});

// STARTSIDA INDEX

const menu = [
  { name: "Nyheter", link: "/nyheter" },
  { name: "Topplistan", link: "/top" },
  { name: "Rea", link: "/rea" },
  { name: "Kampanjer", link: "/kampanjer" }
];

router.get('/', function(req, res) {
    const query = 'SELECT * FROM Products LIMIT 8';

    db.all(query, (err, products) => {
      if (err) {
        console.error('Kunde inte hämta produkter:', err.message);
        return res.status(500).send("Error fetching products.");
      }
  
      res.render('index', { 
        title: 'Freaky Fashion', 
        products: products,
        menu: menu
      });
    });
  });

router.get('/nyheter', function(req, res) {
  res.render('index', { title: 'Nyheter', menu });
});

router.get('/top', function(req, res) {
  res.render('index', { title: 'Topplistan', menu });
});

router.get('/rea', function(req, res) {
  res.render('index', { title: 'Rea', menu });
});

router.get('/kampanjer', function(req, res) {
  res.render('index', { title: 'Kampanjer', menu });
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Kassa' });
});

router.get('/admin/products/index', function(req, res) {
  res.render('admin/products/index', { title: 'Products' });
});

router.get('/admin/products/newproduct', function(req, res) {
  res.render('admin/products/newproduct', { title: 'New Product' });
});
router.get('/admin/products/newcategory', function(req, res) {
  res.render('admin/products/newcategory', { title: 'New Product' });
});

router.get('/admin/products/categories', function(req, res) {
  res.render('admin/products/categories', { title: 'Kategorier' });
});



// GET /productdetails/:id 
router.get('/productdetails/:id', function(req, res, next) {
  
  const productId = req.params.id; 

  const query = 'SELECT * FROM Products WHERE articleNumber = ?';

  db.get(query, [productId], (err, product) => {

    if (err) {
      console.error('Kunde inte hämta produkten:', err.message);
      return res.status(500).send("Error fetching product details.");
    }
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const popularQuery = 'SELECT * FROM Products WHERE articleNumber != ? LIMIT 4';
    
    db.all(popularQuery, [productId], (err, popularProducts) => {
      if (err) {
        console.error('Kunde inte hämta populära produkter:', err.message);
        return res.status(500).send("Error fetching popular products.");
      }

      res.render('productdetails', { 
        title: 'Produktdetaljer', 
        product: product,
        popularProducts: popularProducts,
        menu: menu
      });
    });
  });
});

// POST - Lägg till en ny produkt i databasen
router.post("/add-product", async (req, res) => {
  const { articleNumber, productName, description, productPicture, sku, brand, price, date } = req.body;

  try {
    const productId = await addProduct(articleNumber, productName, description, productPicture, sku, brand, price, date);
    res.status(200).json({ message: "Produkt tillagd!", productId }); 
  } catch (error) {
    console.error("Fel vid produktläggning:", error);
    res.status(500).json({ error: "Fel vid produktläggning" });
  }
});

const productsRouter = require('./products'); 

router.use('/api/products', productsRouter); 


module.exports = router;