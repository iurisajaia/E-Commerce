const express = require("express");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const router = express.Router();
const multer = require("multer");
const randomstring = require("randomstring");
const config = require("../config/mailer");
const nodemailer = require("nodemailer");
// Protect Routes
const auth = require("../middleware/login");

// Import Config
const key = require("../config/keys").secretOrKey;

// Import User Schemas
const User = require("../models/User");
// Import Cart Model
const Cart = require("../models/Cart");
// Import Orders Model
const Orders = require("../models/Orders");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
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

router.post("/add-user-image", upload.single("image"), async (req, res) => {
  const user = await User.findOne({ _id: req.body.user });
  try {
    if (user) {
      user.image = req.file.filename;
      user.save();

      const token = jwt.sign(
        {
          _id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          day: user.day,
          month: user.month,
          image: user.image,
          year: user.year,
          gender: user.gender,
          money: user.money,
          cart: user.cart,
          adress: user.adress,
          phone: user.phone,
          zip: user.zip,
          city: user.city,
          orders: user.orders,
          products: user.products,
          messages: user.messages
        },
        key,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    }
  } catch (err) {
    console.log(err);
  }
});
// User Registration
router.post("/registration", async (req, res) => {
  let errors = [];
  console.log(req.body)
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
    req.body.gender == null || req.body.terms == false
  ) {
    errors.push({ message: "all fields are required" });
  }

  if (req.body.password.legnth < 6) {
    errors.push({ message: "password must be min 6 simbols" });
  }

  if (req.body.password != req.body.repassword) {
    errors.push({ message: "passwords dont match" });
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    errors.push({ message: "email already exists" });
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
      .json({ success: "succes!" });
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
            image: user.image,
            day: user.day,
            month: user.month,
            year: user.year,
            gender: user.gender,
            money: user.money,
            cart: user.cart,
            adress: user.adress,
            phone: user.phone,
            zip: user.zip,
            city: user.city,
            orders: user.orders,
            products: user.products,
            messages: user.messages
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
          image: user.image,
          year: user.year,
          gender: user.gender,
          money: user.money,
          cart: user.cart,
          adress: user.adress,
          phone: user.phone,
          zip: user.zip,
          city: user.city,
          orders: user.orders,
          products: user.products,
          messages: user.messages
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
        image: user.image,
        year: user.year,
        gender: user.gender,
        money: user.money,
        cart: user.cart,
        adress: user.adress,
        phone: user.phone,
        zip: user.zip,
        city: user.city,
        orders: user.orders,
        products: user.products,
        messages: user.messages
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
          image: user.image,
          month: user.month,
          year: user.year,
          gender: user.gender,
          money: user.money,
          cart: user.cart,
          adress: user.adress,
          phone: user.phone,
          zip: user.zip,
          city: user.city,
          orders: user.orders,
          products: user.products,
          messages: user.messages
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
    res.status(200).json({ alluser, allcart, user });
  } else {
    res.status(200).json({ user });
  }
});

// Send Message
router.post("/send-message-to-admin", async (req, res) => {
  // console.log(req.body);
  const user = await User.findOne({ isAdmin: true });
  const author = await User.findOne({ username: req.body.username });
  try {
    if (user) {
      // console.log(user);
      const newMessage = {
        messageBody: req.body.message,
        messageUser: req.body.user,
        username: req.body.username
      };

      await user.messages.inbox.push(newMessage);
      await author.messages.send.push(newMessage);
      author.save();
      user.save().then(res.status(200).json("message sent!"));
    } else {
      res.status(400).json("არ გაიგზავნა");
    }
  } catch (err) {
    console.log(err);
  }
});

// Answer
router.post("/admin-answer", async (req, res) => {
  const user = await User.findOne({ _id: req.body.user });
  const admin = await User.findOne({ isAdmin: true });
  try {
    const answer = {
      messageBody: req.body.message,
      username: "Administrator"
    };
    const sent = {
      messageBody: req.body.message,
      username: "Administrator",
      messageUser: req.body.user
    };
    user.messages.inbox.push(answer);
    admin.messages.send.push(sent);
    await user.save();
    await admin.save();
    res.status(200).json({ msg: "message sent!" });
  } catch (err) {
    console.log(err);
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

// Buy Products
router.post("/buy-products", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.user });
    const orders = await Orders.find({});
    if (orders && user) {
      if (req.body.total > user.money) {
        res.status(400).json({
          msg: "you don't have enought money, you can check in your profile"
        });
      } else {
        const usercart = await Cart.deleteOne({ user: req.body.user }).exec();
        const newOrder = new Orders({
          user: req.body.user,
          products: req.body.carts
        });

        await newOrder.save();

        const products = newOrder._id;
        user.orders.push(products);
        user.money -= req.body.total;
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
            cart: user.carts,
            adress: user.adress,
            image: user.image,
            phone: user.phone,
            zip: user.zip,
            city: user.city,
            orders: user.orders,
            messages: user.messages
          },
          key,
          { expiresIn: "1h" }
        );

        res.status(200).json(token);
        await usercart.save();
      }
    } else {
      console.log("some error");
    }
  } catch (err) {
    console.log("err", err.message);
  }
});

// Verify User - Send Email
router.post("/verify-user", async (req, res) => {
  const user = await User.findOne({ _id: req.body.user });

  // const secrettoken = randomstring.generate();
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: config.MAILGUN_USER,
      pass: config.MAILGUN_PASS
    }
  });

  const html = `<h1>Hello ${user.username} </h1> <br/>  <a href="http://localhost:5000/verify/${user._id}" style="background:green;padding:15px 30px 30px; color:#fff;text-decoration:none;" target="_blank">Confirm And Get Money</a>`;
  var mailOptions = {
    from: "sajaiaiuri@gmail.com",
    to: user.email,
    subject: "Confirm email",
    html: html
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

// Confirm Email
router.get('/verify/:id', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
  if (user) {
    user.isActive = true;
    user.money = 10000;
    user.save();
    res.redirect('http://localhost:3000/login')
  }
})
module.exports = router;
