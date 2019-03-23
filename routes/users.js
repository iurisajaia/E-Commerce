const express = require("express");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const router = express.Router();

// Protect Routes
const auth = require("../middleware/login");

// Import Config
const key = require("../config/keys").secretOrKey;

// Import User Schemas
const User = require("../models/User");
// Import Cart Model
const Cart = require("../models/Cart");

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

// Update User {
router.put("/update-user", async (req, res) => {
  let user = await User.findOne({ _id: req.body.id });

  if (user) {
    if (req.body.newpassword && req.body.oldpassword) {
      const validPassword = await bcrypt.compare(
        req.body.oldpassword,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({ error: "old password is incorrect" });
      } else {
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.newpassword;

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = jwt.sign(
          {
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            day: user.day,
            month: user.month,
            year: user.year,
            gender: user.gender,
            money: user.money,
            cart: user.cart,
            adress: user.adress,
            phone: user.phone,
            zip: user.zip,
            city: user.city
          },
          key,
          { expiresIn: "1h" }
        );
        return res
          .header("x-auth-token", token)
          .status(200)
          .json({ token, passwordchanged: true });
      }
    } else if (!req.body.newpassword && !req.body.oldpassword) {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.username = req.body.username;
      user.email = req.body.email;
      await user.save();
      const token = jwt.sign(
        {
          _id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          day: user.day,
          month: user.month,
          year: user.year,
          gender: user.gender,
          money: user.money,
          cart: user.cart,
          adress: user.adress,
          phone: user.phone,
          zip: user.zip,
          city: user.city
        },
        key,
        { expiresIn: "1h" }
      );
      return res
        .header("x-auth-token", token)
        .status(200)
        .json({ token });
    } else {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.username = req.body.username;
      user.email = req.body.email;
      await user.save();
      return res.status(400).json({ error: "old password is incorrect" });
    }
  }
});

// Update User Info
router.put("/update-info", async (req, res) => {
  let user = await User.findOne({ _id: req.body.id });

  if (user) {
    user.phone = req.body.phone;
    user.adress = req.body.adress;
    user.city = req.body.city;
    user.zip = req.body.zip;

    await user.save();
    const token = jwt.sign(
      {
        _id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        day: user.day,
        month: user.month,
        year: user.year,
        gender: user.gender,
        money: user.money,
        cart: user.cart,
        adress: user.adress,
        phone: user.phone,
        zip: user.zip,
        city: user.city
      },
      key,
      { expiresIn: "1h" }
    );
    return res
      .header("x-auth-token", token)
      .status(200)
      .json({ token });
  } else {
    console.log("not found");
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
      const token = jwt.sign(
        {
          _id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          day: user.day,
          month: user.month,
          year: user.year,
          gender: user.gender,
          money: user.money,
          cart: user.cart,
          adress: user.adress,
          phone: user.phone,
          zip: user.zip,
          city: user.city
        },
        key,
        { expiresIn: "1h" }
      );
      return res
        .header("x-auth-token", token)
        .status(200)
        .json({ token });
    }
  }
});

//User Profile
router.get("/me", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.isAdmin) {
    const allcart = await Cart.find();
    const alluser = await User.find();
    res.status(200).json({ alluser,allcart, user });
  } else {
    res.status(200).json({ user });
  }
});

// Send Message
router.put("/message/:id", async (req, res) => {
  // console.log(req.body);
  const user = await User.find({ isAdmin: true });

  if (user) {
    const newMessage = {
      messageBody: req.body.message,
      messageUser: req.body.user
    };

    await user[0].messages.push(newMessage);
    user[0].save().then(res.status(200).json("message sent!"));
  } else {
    res.status(400).json("არ გაიგზავნა");
  }
});

// Insert Product In User Prop
router.post("/addtocart", async (req, res) => {
  const decoded = jwt_decode(req.body.token);
  const productID = req.body.productID;
  let user = await User.findById({ _id: decoded._id });

  // If Product Is In Cart remove it, else
  let inCart = user.products;
  inCart.includes(productID)
    ? inCart.splice(inCart.indexOf(productID))
    : inCart.push(productID);

  user.products = inCart;
  user.save().then(res.status(200).json(user));
});
module.exports = router;
