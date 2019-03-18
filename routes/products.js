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

router.get("/all-product", async (req, res) => {
  const product = await Product.find();

  if (!product) {
    return res.status(400).json("No Products");
  } else {
    return res.status(200).json(product);
  }
});

router.post("/add-product", async (req, res) => {
  const product = await Product.findOne({ title: req.body.title });

  if (product) {
    res.status(400).json("Product already added");
  } else {
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      categories: req.body.categories,
      imageUrl: req.body.imageUrl,
      companies: {
        name: req.body.name,
        price: req.body.price
      }
    });

    await newProduct.save();
    return res.status(200).json({ product: newProduct });
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
    product.save().then(res.status(200).json("new review added!"));
  } else {
    res.status(400).json("არ დაემატა");
  }
});
module.exports = router;
