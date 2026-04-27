
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/utilities/freakyfashion.db');

//för att lägga till
router.post("/", (req, res) => {
  console.log(req.body);

  res.status(200).json({
    message: "Produkt tillagd!",
    data: req.body
  });
});


// för att hämta från databas
router.get('/', (req, res) => {
  db.all('SELECT * FROM Products', (err, rows) => { 
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); 
  });
});

//för att exportera routes
module.exports = router;
