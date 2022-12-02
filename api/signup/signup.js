const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const SignupController = require('../controller/signup');
const uri = "mongodb+srv://cpad:cpad.123@cluster0.k6bzgju.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.post("/", SignupController.signup_post);
router.get("/", checkAuth, SignupController.signup_get);

module.exports = router;
