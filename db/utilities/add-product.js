// Importera sqlite3 biblioteket och aktivera verbose-läge för detaljerad felhantering
const sqlite3 = require("sqlite3").verbose();
// Importera path-modulen för att hantera filvägar
const path = require("path");

// Skapa en sökväg till databasen med hjälp av path.join för att säkerställa att vägen är korrekt
const dbPath = path.join(__dirname, 'freakyfashion.db');
// Skapa en instans av databasen
const db = new sqlite3.Database(dbPath);

// Funktion för att lägga till en produkt i databasen
function addProduct(articleNumber, productName, description, productPicture, sku, brand, price, date) {
    return new Promise((resolve, reject) => {
        // SQL-fråga för att infoga en ny produkt i tabellen "Products"
        const query = `
            INSERT INTO Products (articleNumber, productName, description, productPicture, sku, brand, price, date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Skapa en lista med värden som ska sättas in i SQL-frågan
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

        // Kör SQL-frågan med de angivna värdena
        db.run(query, values, function (error) {
            if (error) {
                return reject(error); // Om ett fel uppstår vid körning, avvisa med felet
            }
            resolve(this.lastID); // Om allt går bra, returnera det sista ID:t för den nyinlagda produkten
        });
    });
}

// Exportera funktionen så att den kan användas i andra delar av projektet
module.exports = addProduct;
