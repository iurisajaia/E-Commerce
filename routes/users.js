const express = require("express");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Protect Routes
const auth = require("../middleware/login");

// Import Config
const key = require("../config/keys").secretOrKey;

// Import User Schemas
const User = require("../models/User");

// User Registration
router.post("/registration", async (req, res) => {
  let errors = [];

  if (
    req.body.firstname == "" ||
    req.body.firstname == undefined ||
    req.body.firstname == null ||
    req.body.lastname == "" ||
    req.body.lastname == undefined ||
    req.body.lastname == null ||
    req.body.username == "" ||
    req.body.username == undefined ||
    req.body.username == null ||
    req.body.email == "" ||
    req.body.email == undefined ||
    req.body.email == null ||
    req.body.password == "" ||
    req.body.password == undefined ||
    req.body.password == null ||
    req.body.repassword == "" ||
    req.body.repassword == undefined ||
    req.body.repassword == null ||
    req.body.month == "" ||
    req.body.month == undefined ||
    req.body.month == null ||
    req.body.day == "" ||
    req.body.day == undefined ||
    req.body.day == null ||
    req.body.year == "" ||
    req.body.year == undefined ||
    req.body.year == null ||
    req.body.gender == "" ||
    req.body.gender == undefined ||
    req.body.gender == null
  ) {
    errors.push({ message: "ყველა ველი სავალდებულოა" });
  }

  if (req.body.password.legnth < 6) {
    errors.push({ message: "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს" });
  }

  if (req.body.password != req.body.repassword) {
    errors.push({ message: "პაროლები არ ემთხვევა" });
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    errors.push({ message: "იმეილი უკვე დარეგისტრირებულია" });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
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
    return res
      .status(200)
      .json({ success: "თქვენ წარმატებით გაირეთ რეგისტრაცია" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  if (
    req.body.email == "" ||
    req.body.email == undefined ||
    req.body.email == null ||
    req.body.password == "" ||
    req.body.password == undefined ||
    req.body.password == null
  ) {
    return res.json({ error: "all fields are required" });
  }
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ error: "incorrect email or password" });
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    } else {
      const token = jwt.sign({ _id: user.id }, key);
      return res
        .header("x-auth-token", token)
        .status(200)
        .json({ token });
    }
  }
});

//User Profile
// router.get("/me", auth, async (req, res, next) => {
//   const user = await User.findById(req.user.id).select("-password");
//   res.status(200).json({ user });
// });
module.exports = router;
