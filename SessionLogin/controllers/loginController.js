// const { Request, Response } = require("express");
 const users = require("../models/userModel").users;

 const loginRoute = (req, res) => {
    const q = req.query.q;
    const error =
      q === "invalid" ? "Invalid credentials" :
      q === "need-login" ? "Please login first" :
        null;
  res.render("login", { error });
};
const loginPost = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.redirect("/login?q=invalid");

  // create session after success
  req.session.userId = user.id;
  req.session.username = user.username;

  return res.redirect("/profile");
};

 const logoutPost = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  })};

const profileRoute = (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  res.render("profile", { user });
}

module.exports = { loginRoute, loginPost, profileRoute, logoutPost };