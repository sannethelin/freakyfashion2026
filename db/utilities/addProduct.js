
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, '../../data/freakyfashion.db');

const db = new sqlite3.Database(dbPath);


function addProduct(articleNumber, productName, description, productPicture, sku, brand, price, date) {
    return new Promise((resolve, reject) => {
        

        const query = `
            INSERT INTO Products (articleNumber, productName, description, productPicture, sku, brand, price, date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            articleNumber,       
            productName,          
            description,          
            productPicture,       
            sku,                  
            brand,                
            price,                
            date                  
        ];

        db.run(query, values, function (error) {
            if (error) {
                return reject(error); 
            }
            resolve(this.lastID); 
        });
    });
}

module.exports = addProduct;
