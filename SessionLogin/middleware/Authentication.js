// --- Middleware: protect pages ---
function requireLogin(req, res, next) {
  if (!req.session.userId) return res.redirect("/login?q=need-login");
  next();
}

module.exports = { requireLogin };