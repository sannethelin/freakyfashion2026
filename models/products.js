const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// DATABAS
const dbPath = path.join(__dirname, "../data/freakyfashion.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Kunde inte ansluta till databasen:", err.message);
  } else {
    console.log("Databas ansluten");
  }
});

// PRODUKTER

// Hämta en produkt via artikelnummer
exports.getById = (articleNumber, callback) => {
  const sql = `
    SELECT *
    FROM Products
    WHERE articleNumber = ?
  `;

  db.get(sql, [articleNumber], callback);
};

// Hämta produkter till startsidan
exports.getAll = (callback) => {
  const sql = `
    SELECT *
    FROM Products
    LIMIT 8
  `;

  db.all(sql, callback);
};

// Hämta alla produkter till adminlistan
exports.getAllProducts = (callback) => {
  const sql = `
    SELECT
      productName,
      articleNumber,
      price
    FROM Products
  `;

  db.all(sql, callback);
};

// Hämta liknande produkter
exports.getSimilar = (articleNumber, callback) => {
  const sql = `
    SELECT *
    FROM Products
    WHERE articleNumber != ?
    LIMIT 3
  `;

  db.all(sql, [articleNumber], callback);
};

// Skapa ny produkt och koppla den till en kategori
exports.create = (data, callback) => {
  const {protocol=https
    articleNumber,
    productName,
    description,
    productPicture,
    sku,
    brand,
    price,
    categoryId,
  } = data;

  const productSql = `
    INSERT INTO Products
    (articleNumber, productName, description, productPicture, sku, brand, price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    productSql,
    [
      articleNumber,
      productName,
      description,
      productPicture,
      sku,
      brand,
      price,
    ],
    function (err) {
      if (err) {
        return callback(err);
      }

      const productId = this.lastID;

      const categorySql = `
        INSERT INTO product_categories
        (product_id, category_id)
        VALUES (?, ?)
      `;

      db.run(categorySql, [productId, categoryId], callback);
    },
  );
};

// Sök produkter på namn eller märke
exports.searchProducts = (searchQuery, callback) => {
  const sql = `
    SELECT *
    FROM Products
    WHERE productName LIKE ?
    OR brand LIKE ?
  `;

  db.all(sql, [`%${searchQuery}%`, `%${searchQuery}%`], callback);
};

// KATEGORIER

// Hämta alla kategorier
exports.getAllCategories = (callback) => {
  const sql = `
    SELECT *
    FROM categories
  `;

  db.all(sql, callback);
};

// Hämta produkter från en kategori
exports.getByCategoryName = (categoryName, callback) => {
  const sql = `
    SELECT p.*
    FROM Products p
    JOIN product_categories pc ON p.id = pc.product_id
    JOIN categories c ON c.id = pc.category_id
    WHERE c.name = ?
  `;

  db.all(sql, [categoryName], callback);
};

// Skapa ny kategori
exports.createCategory = (data, callback) => {
  const { name } = data;

  const sql = `
    INSERT INTO categories (name)
    VALUES (?)
  `;

  db.run(sql, [name], callback);
};
