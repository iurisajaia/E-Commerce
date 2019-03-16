const express = require("express");
const router = express.Router();

// Protect Routes
const auth = require("../middleware/login");

// Import Config
const key = require("../config/keys").secretOrKey;

// Import Companies Schemas
const Companies = require("../models/Companies");

router.get("/admin/companies", async (req, res) => {
  const companies = await Companies.find();

  if (companies) {
    res.status(200).json({ companies });
  } else {
    res.status(400).json("No companies");
  }
});
router.post("/add-company", async (req, res) => {
  const company = await Companies.findOne({ name: req.body.name });

  if (company) {
    res.status(400).json("ასეთი კომპანია უკვე არსებობს");
  } else {
    var newCompany = new Companies({
      name: req.body.name
    });
    await newCompany.save();
    res.status(200).json("კომპანია დაემატა");
  }
});

module.exports = router;
