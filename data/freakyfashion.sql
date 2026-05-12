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

UPDATE products
SET articleNumber = 1001
WHERE ID = 1;

INSERT INTO products (productName, articleNumber, productPicture, description, SKU, price, brand)
VALUES
('Vit T-shirt', 1002, 'public/images/white_tshirt.png', 'En vit basic t-shirt för vardag och stil', 'TSHIRT-002', 199, 'FreakyFashion'),
('Svart Hoodie', 1003, 'public/images/black_hoodie.png', 'Mjuk hoodie i svart med avslappnad passform', 'HOODIE-001', 199, 'FreakyFashion'),
('Grå Hoodie', 1004, 'public/images/grey_hoodie.png', 'Grå hoodie med minimalistisk design', 'HOODIE-002', 199, 'FreakyFashion'),
('Vita Sneakers', 1005, 'public/images/white_sneakers.png', 'Stilrena vita sneakers för alla tillfällen', 'SHOES-001', 199, 'FreakyFashion'),
('Svarta Sneakers', 1006, 'public/images/black_sneakers.png', 'Bekväma svarta sneakers för vardagsbruk', 'SHOES-002', 199, 'FreakyFashion'),
('Svart Keps', 1007, 'public/images/black_cap.png', 'Klassisk svart keps med justerbar passform', 'CAP-001', 199, 'FreakyFashion'),
('Vit Keps', 1008, 'public/images/white_cap.png', 'Ren och enkel vit keps', 'CAP-002', 199, 'FreakyFashion'),
('Solglasögon', 1009, 'public/images/sunglasses.png', 'Solglasögon med UV-skydd och modern design', 'SUN-001', 199, 'FreakyFashion'),
('Mössa', 1010, 'public/images/beanie.png', 'Stickad mössa för kalla dagar', 'BEANIE-001', 199, 'FreakyFashion');


INSERT INTO products (productName, price, brand, description, SKU, productPicture)
VALUES
('T-shirt', 199, 'Nike', 'En skön T-shirt', 'T-SHIRT-001', 'black_tshirt.png');

UPDATE products
SET articleNumber = 1001
WHERE ID = 1;

INSERT INTO products (productName, articleNumber, productPicture, description, SKU, price, brand)
VALUES
('Vit T-shirt', 1002, 'public/images/white_tshirt.png', 'En vit basic t-shirt för vardag och stil', 'TSHIRT-002', 199, 'FreakyFashion'),
('Svart Hoodie', 1003, 'public/images/black_hoodie.png', 'Mjuk hoodie i svart med avslappnad passform', 'HOODIE-001', 199, 'FreakyFashion'),
('Grå Hoodie', 1004, 'public/images/grey_hoodie.png', 'Grå hoodie med minimalistisk design', 'HOODIE-002', 199, 'FreakyFashion'),
('Vita Sneakers', 1005, 'public/images/white_sneakers.png', 'Stilrena vita sneakers för alla tillfällen', 'SHOES-001', 199, 'FreakyFashion'),
('Svarta Sneakers', 1006, 'public/images/black_sneakers.png', 'Bekväma svarta sneakers för vardagsbruk', 'SHOES-002', 199, 'FreakyFashion'),
('Svart Keps', 1007, 'public/images/black_cap.png', 'Klassisk svart keps med justerbar passform', 'CAP-001', 199, 'FreakyFashion'),
('Vit Keps', 1008, 'public/images/white_cap.png', 'Ren och enkel vit keps', 'CAP-002', 199, 'FreakyFashion'),
('Solglasögon', 1009, 'public/images/sunglasses.png', 'Solglasögon med UV-skydd och modern design', 'SUN-001', 199, 'FreakyFashion'),
('Mössa', 1010, 'public/images/beanie.png', 'Stickad mössa för kalla dagar', 'BEANIE-001', 199, 'FreakyFashion');

INSERT INTO product_categories (product_id, category_id)
VALUES
(1,2),
(2,2);

INSERT INTO products (productName, articleNumber, productPicture, description, SKU, price, brand)
VALUES
('Svarta Sneakers', 2001, 'public/images/black_shoe.jpeg', 'Stilrena svarta sneakers med modern design', 'SHOE-101', 199, 'FreakyFashion'),
('Vita Sneakers', 2002, 'public/images/black_shoe.jpeg', 'Vita sneakers med clean look och bra komfort', 'SHOE-102', 199, 'FreakyFashion'),
('Sportskor Svarta', 2003, 'public/images/black_shoe.jpeg', 'Bekväma sportskor för vardag och träning', 'SHOE-103', 199, 'FreakyFashion'),
('Löparskor Grå', 2004, 'public/images/black_shoe.jpeg', 'Lätta löparskor med bra stötdämpning', 'SHOE-104', 199, 'FreakyFashion'),
('Svarta Solglasögon Klassiska', 3001, 'public/images/black_sunglasses.webp', 'Klassiska solglasögon med UV-skydd', 'SUN-101', 199, 'FreakyFashion'),
('Sport Solglasögon', 3002, 'public/images/black_sunglasses.webp', 'Sportiga solglasögon för aktiv livsstil', 'SUN-102', 199, 'FreakyFashion'),
('Retro Solglasögon', 3003, 'public/images/black_sunglasses.webp', 'Retroinspirerade solglasögon med stil', 'SUN-103', 199, 'FreakyFashion'),
('Polariserade Solglasögon', 3004, 'public/images/black_sunglasses.webp', 'Solglasögon med polariserade linser', 'SUN-104', 199, 'FreakyFashion');

INSERT INTO (product_id, categori_id)
VALUES
(11,3),
(12,3),
(13,3),
(14,3),
(15,4),
(16,4),
(17,4),
(18,4);

