const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Route to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    subtitle: req.body.subtitle,
    price: req.body.price,
    description: req.body.description,
    size: req.body.size,
    image: req.body.image,
    thumbnail: req.body.thumbnail,
    original_price: req.body.original_price,
    slug: req.body.slug,
    categories: req.body.categories
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get a single product
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Route to update a single product
router.patch('/:id', getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }

  if (req.body.subtitle != null) {
    res.product.subtitle = req.body.subtitle;
  }

  if (req.body.price != null) {
    res.product.price = req.body.price;
  }

  if (req.body.description != null) {
    res.product.description = req.body.description;
  }

  if (req.body.size != null) {
    res.product.size = req.body.size;
  }

  if (req.body.image != null) {
    res.product.image = req.body.image;
  }

  if (req.body.thumbnail != null) {
    res.product.thumbnail = req.body.thumbnail;
  }

  if (req.body.original_price != null) {
    res.product.original_price = req.body.original_price;
  }

  if (req.body.slug != null) {
    res.product.slug = req.body.slug;
  }

  if (req.body.categories != null) {
    res.product.categories = req.body.categories;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a single product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single product by id
async function getProduct(req, res, next) {
  let product;

  try {
    product = await Product.findById(req.params.id);

    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

module.exports = router;
