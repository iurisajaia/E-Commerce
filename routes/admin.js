const express = require("express");
const router = express.Router();

// Import Admin Secrets
const admin = require("../config/keys").admin;

// Import User Schemas
const User = require("../models/User");

//Admin Login
router.post("/user/admin/login", (req, res) => {
  if (
    req.body.username == admin.username &&
    req.body.password == admin.password
  ) {
    res.status(200).json({ msg: "wellcome admin" });
  } else {
    res.status(400).json({ msg: "invallid data" });
  }
});

// Admin Panel/ Users
router.get("/user/admin/users", async (req, res) => {
  let user = await User.find();

  if (!user) return res.status(400).json({ msg: "no users" });

  return res.status(200).json({ user });
});
module.exports = router;
