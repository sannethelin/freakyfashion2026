// Importera de nödvändiga modulerna
const path = require("path");  // För hantering av filvägar
const sqlite3 = require("sqlite3").verbose(); // För att arbeta med SQLite-databasen
const express = require('express'); // För Express-frameworket
const router = express.Router(); // Skapar en Express-router
const addProduct = require("../db/utilities/add-product"); // Importerar funktionen för att lägga till en produkt i databasen

// Definiera sökvägen till databasen
const dbPath = path.join(__dirname, '../db/utilities/freakyfashion.db');
console.log("Databasväg:", dbPath);

// Serva statiska filer från "public" mappen
router.use(express.static(path.join(__dirname, 'public')));

// Länka till startsidan "/index" och rendera vyn 'index.ejs'
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Freakyfashion' });
});


// Länka till checkout-sidan "/checkout" och rendera vyn 'checkout.ejs'
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Kassa' });
});

// Länka till admin-produktens sida "/admin/products/product" och rendera vyn 'admin/products/product.ejs'
router.get('/admin/products/product', function(req, res) {
  res.render('admin/products/product', { title: 'Products' });
});

// Länka till sidan för att lägga till nya produkter "/admin/products/new" och rendera vyn 'admin/products/new.ejs'
router.get('/admin/products/new', function(req, res) {
  res.render('admin/products/new', { title: 'New Product' });
});

// GET / - Hämta alla produkter och rendera dem på startsidan
router.get('/', function(req, res, next) {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error('Kunde inte ansluta till databasen:', err.message);
      return res.status(500).send("Database connection error.");
    }
  });

  const query = 'SELECT * FROM Products LIMIT 8';
  db.all(query, [], (err, products) => {
    if (err) {
      console.error('Kunde inte hämta produkter:', err.message);
      return res.status(500).send("Error fetching products.");
    }

    db.close(); // Stäng databasen när frågan är klar
    res.render('index', { title: 'Freaky Fashion', products: products });
  });
});

// GET /productdetails/:id - Visa detaljer för en specifik produkt baserat på artikelnummer
router.get('/productdetails/:id', function(req, res, next) {
  const productId = req.params.id; // Hämta produktens artikelnummer från URL:en

  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error('Kunde inte ansluta till databasen:', err.message);
      return res.status(500).send("Database connection error.");
    }
  });

  const query = 'SELECT * FROM Products WHERE articleNumber = ?';
  db.get(query, [productId], (err, product) => {
    if (err) {
      console.error('Kunde inte hämta produkten:', err.message);
      return res.status(500).send("Error fetching product details.");
    }

    db.close(); // Stäng databasen när frågan är klar

    // den enskilda produkten till EJS-vyn
    res.render('productdetails', { title: 'Produktdetaljer', product: product });
  });
});


// POST /add-product - Lägg till en ny produkt i databasen
router.post("/add-product", async (req, res) => {
  const { articleNumber, productName, description, productPicture, sku, brand, price, date } = req.body;

  try {
    const productId = await addProduct(articleNumber, productName, description, productPicture, sku, brand, price, date);
    res.status(200).json({ message: "Produkt tillagd!", productId }); // Skicka ett svar med produktens ID
  } catch (error) {
    console.error("Fel vid produktläggning:", error);
    res.status(500).json({ error: "Fel vid produktläggning" }); // Hantera fel och skicka ett felmeddelande
  }
});

const productsRouter = require('./products'); // Importera products.js-rutten

// Använd router för produkter
router.use('/api/products', productsRouter); 

// Använd API-rutter
module.exports = router;
