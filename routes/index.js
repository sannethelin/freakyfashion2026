
const path = require("path");
const sqlite3 = require("sqlite3").verbose(); // Viktigt för att använda sqlite3
const express = require('express');
const router = express.Router();
const dbPath = './utilities/freakyfashion.db'; // Ange sökvägen till din databasfil

const app = express();

// Servar statiska filer från 'public' mappen
app.use(express.static(path.join(__dirname, 'public')));


//Länka till startsida
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Freakyfashion' });
});

// Länka till checkout.ejs
router.get('/checkout', function(req, res, next) {
  res.render('checkout',  { title: 'Kassa' });
});


// Länka för admin/products/prooduct
router.get('/admin/products/product', function(req, res) {
  res.render('admin/products/product', { title: 'Products' }); 
  
});

// Länka för admin/products/new
router.get('/admin/products/new', function(req, res) {
  res.render('admin/products/new', { title: 'New Product' });
});



module.exports = router;


// GET /
router.get('/', function(req, res, next) {
  // Anslut till databasen
  const dbPath = 'db/utilities/freakyfashion.db';
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error('Kunde inte ansluta till databasen:', err.message);
      return res.status(500).send("Database connection error.");
    }
  });

  // Hämta produkter från databasen
  const query = 'SELECT * FROM Products';
  db.all(query, [], (err, products) => {
    if (err) {
      console.error('Kunde inte hämta produkter:', err.message);
      return res.status(500).send("Error fetching products.");
    }

    // Stäng anslutningen
    db.close();

    // Skicka produkterna till vyn
    const viewData = {
      title: 'Freaky Fashion',
      products: products
    };
    res.render('index', viewData);
  });
});


// GET /productdetails/svart-tshrit
router.get('/productdetails/:id', function(req, res, next) {
  const productId = req.params.id; //få värdet från url

// TODO: hur kommer vi t värdet som ligger i URL:en

  // Anslut till databasen
  const dbPath = 'db/utilities/freakyfashion.db';
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error('Kunde inte ansluta till databasen:', err.message);
      return res.status(500).send("Database connection error.");
    }
  });

  // Hämta produkter från databasen
  const query = 'SELECT * FROM Products';
  db.all(query, [], (err, products) => {
    if (err) {
      console.error('Kunde inte hämta produkter:', err.message);
      return res.status(500).send("Error fetching products.");
    }

    // Stäng anslutningen
    db.close();

    // Skicka produkterna till vyn
    const viewData = {
      title: 'Freaky Fashion',
      products: products
    };
    res.render('productdetails', viewData);
  });
});


// registrera en produkt

app.get ("/add-product", function (req,res) {
  res.render ("add-product",{
  title: "Lägg till produkt"
  });
});