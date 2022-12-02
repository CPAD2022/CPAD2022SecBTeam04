const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.signup_get = (req, res, next) => {
    res.status(200).json({
        message: 'handling post req to /signup'
    })
  };

exports.signup_post = (req, res, next) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
      if(user.length >= 1) {return res.status(409).json({ error: "Email is already in use" }); }
      else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).json({ error: "Could not calculate hash" });
              } else {
                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  email: req.body.email,
                  password: hash,
                });
                user
                  .save()
                  .then((result) => {
                    res.status(200).json({
                      message: "data inserted to db successfull",
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                      message: "data inserted to db failed",
                    });
                  });
              }
            });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
          message: "data inserted to db failed",
      });
    })
    // res.status(200).json({
    //     message: 'handling post req to /signup'
    // })
  };