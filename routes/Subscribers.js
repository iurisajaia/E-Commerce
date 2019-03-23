const express = require("express");
const router = express.Router();
const Subscribes = require("../models/Subscribe");

// Add New Email
router.post("/subscribe", async (req, res) => {
    const email = await Subscribes.findOne({ emails : req.body.email });
    if(email){
      res.status(400).json({msg : 'mail already is in our db'})
    }else{
     const newemail = new Subscribes ({
       emails : req.body.email
     })
     await newemail.save()
     res.status(200).json({msg  : 'email added'})
    }
    
  });
  module.exports = router;