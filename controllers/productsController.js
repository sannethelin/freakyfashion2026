const Product = require("../models/products");


// PUBLIKA SIDOR

// Visa startsidan
exports.getHomePage = (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      return res.status(500).send("Fel vid hämtning av produkter");
    }

    res.render("index", {
      title: "Freaky Fashion",
      products,
    });
  });
};


// Visa produktdetaljer
exports.getProductDetails = (req, res) => {
  const articleNumber = req.params.articleNumber;

  Product.getById(articleNumber, (err, product) => {
    if (err) {
      return res.status(500).send("Fel vid hämtning av produkt");
    }

    if (!product) {
      return res.status(404).send("Produkten hittades inte");
    }

    Product.getSimilar(articleNumber, (err, similarProducts) => {
      if (err) {
        return res.status(500).send("Fel vid hämtning av liknande produkter");
      }

      res.render("productdetails", {
        title: product.productName,
        product,
        similarProducts,
      });
    });
  });
};


// Visa bara produkter från en kategori baserat på URL
exports.getCategory = (req, res) => {
  const categoryName = req.params.name;

  Product.getByCategoryName(categoryName, (err, products) => {
    if (err) {
      return res.status(500).send("Fel vid hämtning av kategori");
    }

    res.render("category", {
      title: categoryName,
      products,
    });
  });
};


// Sök produkter
exports.search = (req, res) => {
  const query = req.query.query;

  Product.searchProducts(query, (err, products) => {
    if (err) {
      console.error(err);

      return res.render("searchresult", {
        title: "Sökresultat",
        products: [],
        query,
      });
    }

    res.render("searchresult", {
      title: "Sökresultat",
      products,
      query,
    });
  });
};


// ADMIN - PRODUKTER

// Visa alla produkter för admin
exports.getAdminProducts = (req, res) => {
  Product.getAllProducts((err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Fel vid hämtning av produkter");
    }

    res.render("admin/products/index", {
      title: "Produkter",
      layout: "layouts/admin",
      products,
    });
  });
};


// Ny produkt sida
exports.getNewProductPage = (req, res) => {
  Product.getAllCategories((err, categories) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Fel vid hämtning av kategorier");
    }

    res.render("admin/products/newproduct", {
      title: "Ny produkt",
      layout: "layouts/admin",
      categories,
    });
  });
};


// Lägg till produkt
exports.addProduct = (req, res) => {
  if (req.file) {
    req.body.productPicture = "/images/products/" + req.file.filename;
  }

  Product.create(req.body, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Fel vid produktläggning");
    }

    res.redirect("/admin/products/index");
  });
};


// ADMIN - KATEGORIER

// Alla kategorier i admin
exports.getAdminCategoriesPage = (req, res) => {
  Product.getAllCategories((err, categories) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Fel vid hämtning av kategorier");
    }

    res.render("admin/products/categories", {
      title: "Kategorier",
      layout: "layouts/admin",
      categories,
    });
  });
};


// Ny kategori sida
exports.getNewCategoryPage = (req, res) => {
  res.render("admin/products/newcategory", {
    title: "Ny kategori",
    layout: "layouts/admin",
  });
};

// Lägg till ny kategori
exports.addCategory = (req, res) => {
  Product.createCategory(req.body, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Fel vid tillägg av kategori");
    }

    res.redirect("/admin/products/categories");
  });
};