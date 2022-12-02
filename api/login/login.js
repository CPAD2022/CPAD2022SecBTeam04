const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const LoginController = require('../controller/login');

router.post('/', LoginController.login_post);
router.get("/", checkAuth, LoginController.login_get);

module.exports = router;