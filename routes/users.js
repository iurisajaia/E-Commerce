const express = require("express");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const Joi = require("joy");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Import Config
const key = require("../config/keys").secretOrKey;
// Import User Schemas
const User = require("../models/User");

// Import User Validation
const validate = require("../validation/user").validate;

// User Registration
router.post("/registration", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ error: "email already exists" });
  } else {
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      month: req.body.month,
      day: req.body.day,
      year: req.body.year,
      gender: req.body.gender
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    return res.status(200).json({ user: newUser });
  }
});

// User Login
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ error: "incorrect email or password" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json("Invalid email or password");

  const token = jwt.sign({ _id: user.id }, key);
  return res
    .header("x-auth-token", token)
    .status(200)
    .json({ token });
});

module.exports = router;
