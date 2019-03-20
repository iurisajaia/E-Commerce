const express = require("express");
// const mongoose = require("mongoose");
// const keys = require("../config/keys");
// const passport = require("passport");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const router = express.Router();

// Protect Routes
const auth = require("../middleware/login");

// Import Config
const key = require("../config/keys").secretOrKey;

// Import Categories Schemas
const Categories = require("../models/Categories");

router.get("/admin/categories", async (req, res) => {
  const categories = await Categories.find();

  if (categories) {
    res.status(200).json({ categories });
  } else {
    res.status(400).json("No Categories");
  }
});

router.post("/add-category", async (req, res) => {
  const category = await Categories.findOne({ name: req.body.name });

  if (category) {
    res.status(400).json("ასეთი კატეგორია უკვე არსებობს");
  } else {
    var newCategory = new Categories({
      name: req.body.name
    });
    await newCategory.save();
    res.status(200).json(newCategory);
  }
});

module.exports = router;
