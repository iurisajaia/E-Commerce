const express = require("express");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const router = express.Router();

// Protect Routes
const auth = require("../middleware/login");

// Import Config
const key = require("../config/keys").secretOrKey;

// Import User Schemas
// const User = require("../models/User");
const Categories = require("../models/Categories");
const Companies = require("../models/Companies");
const Product = require("../models/Product");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/all-product", async (req, res) => {
  const product = await Product.find();

  if (!product) {
    return res.status(400).json("No Products");
  } else {
    return res.status(200).json(product);
  }
});

router.post("/add-product", upload.single("imageUrl"), async (req, res) => {
  const product = await Product.findOne({ title: req.body.title });

  if (product) {
    res.status(400).json("Product already added");
  } else {
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories,
      imageUrl: req.file.filename,
      company: req.body.company,
      price: req.body.price
    });

    await newProduct.save();
    return res.status(200).json({ newProduct });
  }
});

router.put("/add-new-company", async (req, res) => {
  // console.log(req.body);
  const product = await Product.findOne({ _id: req.body.product });

  if (product) {
    const newCompany = {
      name: req.body.company,
      price: req.body.price
    };

    await product.companies.push(newCompany);
    product.save().then(res.status(200).json("new company added!"));
  } else {
    res.status(400).json("არ გაიგზავნა");
  }
});

router.put("/add-new-review", async (req, res) => {
  // console.log(req.body);
  const product = await Product.findOne({ _id: req.body.product });

  if (product) {
    const newReview = {
      user: req.body.user,
      userName: req.body.userName,
      review: req.body.review
    };

    await product.reviews.push(newReview);
    product.save().then(res.status(200).json(product));
  } else {
    res.status(400).json("არ დაემატა");
  }
});

router.post("/remove-product", async (req, res) => {
  const product = await Product.findOne({ _id: req.body.id });

  if (product) {
    product.remove();
    product.save;
    res.status(200).json({ prod: product });
  } else {
    res.status(400).json({ msg: "some unknow error" });
  }
});

// Add Product To Cart
router.post("/add-product-to-cart", async (req, res) => {
  const cart = await Cart.findOne({
    user: req.body.user,
    product: req.body.product
  });

  if (cart) {
    res.status(400).json({ msg: "ეს პროდუქტი უკვე დამატებულია" });
  } else {
    const newCart = new Cart({
      user: req.body.user,
      product: req.body.product,
      quantity: req.body.count
    });

    await newCart.save();

    const product = await Product.findOne({ _id: req.body.product });
    if (product) {
      res.status(200).json(product);
    } else {
      console.log("some error");
    }
  }
});

// Get ALl Cart
router.get("/get-all-cart", async (req, res) => {
  const cart = await Cart.find();

  if (cart) {
    await res.status(200).json(cart);
  } else {
    await res.status(400).json({ msg: "No Carts" });
  }
});

// Remove Product from Shopping Cart
router.post("/remove-product-from-cart", async (req, res) => {
  const cart = await Cart.findOne({
    user: req.body.user,
    product: req.body.product
  });

  if (cart) {
    await cart.remove();
    await cart.save();
    res.status(200).json(cart);
  } else {
    console.log("unknow error");
  }
});

// Update Cart
router.put("/update-cart", async (req, res) => {
  const cart = await Cart.findOne({
    user: req.body.user,
    product: req.body.product
  });
  if (cart) {
    cart.quantity = req.body.quantity;
    await cart.save();

    const all = await Cart.find({
      user: req.body.user
    });
    res.status(200).json(all);
  } else {
    console.log("cart not found to change quantity");
  }
});

module.exports = router;
