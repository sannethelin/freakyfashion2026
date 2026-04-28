const Product = require("../models/products");


// GET product details
exports.getProductDetails = (req, res) => {
  const id = req.params.id;

  Product.getById(id, (err, product) => {
    if (err) return res.status(500).send("Error fetching product");

    if (!product) return res.status(404).send("Product not found");

    Product.getPopular(id, (err, popularProducts) => {
      if (err) return res.status(500).send("Error fetching popular");

      res.render("productdetails", {
        title: "Produktdetaljer",
        product,
        popularProducts
      });
    });
  });
};


// POST create product
exports.addProduct = (req, res) => {
  Product.create(req.body, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Fel vid produktläggning" });
    }

    res.json({
      message: "Produkt tillagd!",
      productId: this.lastID
    });
  });
};


// GET homepage
exports.getHomePage = (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      return res.status(500).send("Fel vid hämtning");
    }

    res.render("index", {
      title: "Freaky Fashion",
      products,
    });
  });
};

exports.search = (req, res) => {
  const query = req.query.query;

  Product.searchProducts(query, (err, products) => {
    if (err) {
      console.error(err);
      return res.render("searchresult", {
        title: "Sökresultat",
        products: []
      });
    }

    res.render("searchresult", {
      title: "Sökresultat",
      products: products
    });
  });
};