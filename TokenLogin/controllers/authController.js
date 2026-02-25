const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const secretKey = "your_secret_key"; // use env in real apps

function showLogin(req, res) {
  const q = req.query.q;

  const error =
    q === "invalid" ? "Invalid credentials" :
    q === "missing-token" ? "Please login first" :
    q === "token-expired" ? "Session expired, please login again" :
    null;

  res.render("login", { error });
}

function login(req, res) {
  const { username, password } = req.body;

  const user = UserModel.findByUsernameAndPassword(username, password);
  if (!user) return res.redirect("/login?q=invalid");

  const token = jwt.sign(
    { id: user.id, username: user.username },
    secretKey,
    { expiresIn: "1h" }
  );

  res.cookie("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
    // secure: true, // enable in HTTPS
  });

  return res.redirect("/product");
}

function logout(req, res) {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "lax",
    // secure: true,
  });
  return res.redirect("/");
}

module.exports = { showLogin, login, logout, secretKey };