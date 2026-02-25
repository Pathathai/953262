const express = require("express");
const router = express.Router();

const authenticateToken = require("../middlewares/authenticateToken");
const { showProduct } = require("../controllers/productController");

router.get("/product", authenticateToken, showProduct);

module.exports = router;