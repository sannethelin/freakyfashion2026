// routes/products.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/utilities/freakyfashion.db');

// API-rutt för att hämta 8 produkter som JSON
router.get('/load', (req, res) => {
  db.all('SELECT * FROM Products', (err, rows) => { 
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);  // Skicka tillbaka produkterna som JSON
  });
});

module.exports = router;
