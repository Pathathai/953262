function showProduct(req, res) {
  res.render("product", { user: req.user});
}

module.exports = { showProduct };