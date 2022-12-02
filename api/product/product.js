const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ProductController = require('../controller/product');

router.post('/', ProductController.product_post);
router.get("/", checkAuth, ProductController.product_get);

module.exports = router;