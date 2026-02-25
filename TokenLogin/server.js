const express = require("express");
const cookieParser = require("cookie-parser");

const AuthController = require("./controllers/authController");
const ProductController = require("./controllers/productController");
const authenticateToken = require("./middlewares/authenticateToken");

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

// View pages
app.get("/", (req, res) => res.render("home"));
app.get("/login", AuthController.showLogin);

// Actions
app.post("/login", AuthController.login);
app.post("/logout", AuthController.logout);

// Protected page
app.get("/product", authenticateToken, ProductController.showProduct);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});