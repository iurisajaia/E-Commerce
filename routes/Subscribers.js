const express = require("express");
const router = express.Router();
const Subscribes = require("../models/Subscribe");

router.post("/", async (req, res) => {
    // const Subscribe = await Subscribes.findOne({ user: req.body.name });
    // Subscribes
    res.status(200).json(req.body.email);
  
    // if (category) {
    //   res.status(400).json("ასეთი კატეგორია უკვე არსებობს");
    // } else {
    //   var newCategory = new Categories({
    //     name: req.body.name
    //   });
    //   await newCategory.save();
    //   res.status(200).json(newCategory);
    // }
  });