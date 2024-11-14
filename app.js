// Importera nödvändiga moduler
var createError = require('http-errors'); // För att skapa HTTP-fel
var express = require('express'); // För att skapa Express-applikationen
var path = require('path'); // För att hantera filvägar
var cookieParser = require('cookie-parser'); // För att hantera cookies
var logger = require('morgan'); // För att logga HTTP-anrop

// Importera routers från 'routes' mappen
var indexRouter = require('./routes/index'); // Importera din index-router som definierar vägar för din applikation

var app = express(); // Skapa en ny instans av Express-applikationen

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Ställ in mappen för vyer (där EJS-filerna finns)
app.set('view engine', 'ejs'); // Använd EJS som vy-motor för att rendera HTML

// Middleware
app.use(logger('dev')); // Använd morgan för att logga HTTP-anrop i utvecklingsläge
app.use(express.json()); // Middleware för att parsa inkommande JSON-data
app.use(express.urlencoded({ extended: false })); // Middleware för att hantera form-data
app.use(cookieParser()); // Middleware för att hantera cookies
app.use(express.static(path.join(__dirname, 'public'))); // Middleware för att servera statiska filer från 'public' mappen

// Statisk filhantering för specifika vägar
app.use('/db', express.static('db')); // Gör 'db'-mappen tillgänglig via '/db' URL

// Routers
app.use('/', indexRouter); // Använd indexRouter för att hantera vägar som definieras i 'routes/index.js'

// POST-rutt för att lägga till produkter
app.post("/add-product", function (req, res) {
  // Logga det mottagna produktobjektet för att kontrollera att det kommer fram korrekt
  console.log(req.body);

  // Här kan du lägga till kod för att spara produkten i databasen, till exempel genom att anropa en funktion från en separat fil
  res.status(200).json({ message: "Produkt tillagd!", data: req.body }); // Skicka ett svar tillbaka med status 200 (OK) och det mottagna produktobjektet
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // Skapa ett 404-fel om ingen matchande rutt hittas
});

// error handler
app.use(function(err, req, res, next) {
  // Ställ in felmeddelanden för att visa användaren
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Visa detaljerad felinformation om i utvecklingsläge
  res.status(err.status || 500); // Använd felstatus (404 eller 500)
  res.render('error'); // Rendera 'error.ejs' för att visa ett felmeddelande
});


// Ta ins API-rutten
const productsRouter = require('./routes/products');  
app.use('/api/products', productsRouter); // Koppla API-routen till '/api/products'


// Andra inställningar för din app (t.ex. statiska filer)
app.use(express.static('public'));



// Exportera applikationen så att den kan användas av andra filer (t.ex. server.js)
module.exports = app;
