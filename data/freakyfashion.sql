CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    productName TEXT,
    articleNumber INTEGER,
    productPicture TEXT,
    description TEXT, 
    SKU TEXT,
    price REAL,
    brand TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE product_categories (
    product_id INTEGER,
    catecory_id INTEGER,
    PRIMARY KEY (producy_id, category_id)
);

INSERT INTO categories (name)
    VALUES
        ('Nyheter'),
        ('Kläder'),
        ('Skor'),
        ('Nyheter');

INSERT INTO products (productName, price, brand, description, SKU, productPicture)
VALUES
('T-shirt', 199, 'Nike', 'En skön T-shirt', 'T-SHIRT-001, 'black_tshirt.png');

UPDATE product_categories
SET category_id = 1
WHERE product_id = 1
AND category_id = 2;
