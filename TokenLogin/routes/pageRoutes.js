const express = require("express");
const router = express.Router();

const { showLogin } = require("../controllers/authController");

router.get("/", (req, res) => res.render("home"));
router.get("/login", showLogin);

module.exports = router;