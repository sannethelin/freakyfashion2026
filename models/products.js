const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Databas
const dbPath = path.join(__dirname, "../data/freakyfashion.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Kunde inte ansluta till databasen:", err.message);
  } else {
    console.log("Databas ansluten");
  }
});


// Hämta produkt via ID
exports.getById = (id, callback) => {
  const query = "SELECT * FROM Products WHERE articleNumber = ?";

  db.get(query, [id], callback);
};


// Hämta populära produkter
exports.getPopular = (id, callback) => {
  const query = "SELECT * FROM Products WHERE articleNumber != ? LIMIT 4";

  db.all(query, [id], callback);
};

// Hämta alla produkter (startsida)
exports.getAll = (callback) => {
  const query = "SELECT * FROM Products LIMIT 8";

  db.all(query, callback);
};

// Hämta alla kategorier och ta bort dubletter
exports.getCategories = (callback) => {
  db.all(
    "SELECT DISTINCT categories FROM Products WHERE categories IS NOT NULL",
    callback
  );
};

// Skapa produkt
exports.create = (data, callback) => {
  const {
    articleNumber,
    productName,
    description,
    productPicture,
    sku,
    brand,
    price,
    date
  } = data;

  const query = `
    INSERT INTO Products 
    (articleNumber, productName, description, productPicture, sku, brand, price, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      articleNumber,
      productName,
      description,
      productPicture,
      sku,
      brand,
      price,
      date
    ],
    callback
  );
};