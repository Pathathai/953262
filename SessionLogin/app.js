const express = require("express");
const session = require("express-session");
const { loginRoute, loginPost, profileRoute, logoutPost } = require("./controllers/loginController");
const { requireLogin } = require("./middleware/Authentication");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "replace_with_strong_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");


// --- Pages ---
app.get("/", (req, res) => res.render("home"));
app.get("/login", loginRoute);
app.post("/login", loginPost);
app.get("/profile", requireLogin, profileRoute);
app.post("/logout", logoutPost);

app.listen(port, () => console.log(`http://localhost:${port}`));