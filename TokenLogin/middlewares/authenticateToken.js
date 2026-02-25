const jwt = require("jsonwebtoken");
const { secretKey } = require("../controllers/authController");

function authenticateToken(req, res, next) {
  const token = req.cookies?.access_token;
  if (!token) return res.redirect("/login?q=missing-token");

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.redirect("/login?q=token-expired");
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;