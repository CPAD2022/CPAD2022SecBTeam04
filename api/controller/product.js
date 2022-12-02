const mongoose = require("mongoose");
const Product = require("../models/product");
const moment = require('moment');

exports.product_get = (req, res, next) => {
    Product.find({ email: req.body.email })
        .exec()
        .then(products => {
            console.log(products);
            res.status(200).json({
                message: products
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "product fetch failed"
            });
        })
  };

exports.product_post = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        name: req.body.name,
        expiry: req.body.expiry
    });
    product
    .save()
    .then((result) => {
        res.status(200).json({
            message: "product inserted to db successfull",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "data inserted to db failed",
                });
            });

  };