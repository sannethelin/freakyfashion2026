const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productsController");


// index via controller
router.get('/', (req, res) => {
  productsController.getHomePage(req, res);
});


// undersidor
router.get('/nyheter', (req, res) => {
  res.render('index', { title: 'Nyheter', menu });
});

router.get('/top', (req, res) => {
  res.render('index', { title: 'Topplistan', menu });
});

router.get('/rea', (req, res) => {
  res.render('index', { title: 'Rea', menu });
});

router.get('/kampanjer', (req, res) => {
  res.render('index', { title: 'Kampanjer', menu });
});

router.get('/checkout', (req, res) => {
  res.render('checkout', { title: 'Kassa' });
});

router.get('/searchresult', (req, res) => {
  res.render('searchresult', { title: 'Resultat' });
});

router.get('/categories/:category', (req, res) => {
  const category = req.params.category;
  res.send(category);
});

// admin
router.get('/admin/products/index', (req, res) => {
  res.render('admin/products/index', { title: 'Products' });
});

router.get('/admin/products/newproduct', (req, res) => {
  res.render('admin/products/newproduct', { title: 'New Product' });
});

router.get('/admin/products/newcategory', (req, res) => {
  res.render('admin/products/newcategory', { title: 'New Category' });
});
router.post('/add-product', productsController.addProduct);

router.get('/admin/products/categories', (req, res) => {
  res.render('admin/products/categories', { title: 'Kategorier' });
});



module.exports = router;