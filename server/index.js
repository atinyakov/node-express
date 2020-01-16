const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../db");
var flash = require("connect-flash");
var session = require("express-session");
var connect = require("connect");
var cookieParser = require("cookie-parser");
const usersCtrl = require("../controller");
const fs = require('fs');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("keyboard cat"));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());

app.set("views", "../source/template/pages");
app.set("view engine", "pug");

app.use(
  express.static("../public", {
    extensions: ["html"]
  })
);

app.use(require("./login"));
app.use(require("./admin"));

app.get("/", function(req, res) {
  var data = {
    skills: db.get("skills").value(),
    products: db.get("products").value(),
    msgemail: req.flash("info")[0]
  };
  res.render("index", data);
});

app.post("/", async (req, res) => {

  if (!req.body.name || !req.body.email || !req.body.message) {
    req.flash("info", "Нужно заполнить все поля!");
    res.redirect("/");
  } else {
    try {
      const result = await usersCtrl.posts({ ...req.body });
      if (result) {
        req.flash("info", "Отправлено");
        res.redirect("/");
      }
    } catch (err) {
      res.status(400).json({
        message: err.message
      });
    }
  }
});

if (!fs.existsSync(path.join(process.cwd(), "..", "public", "upload"))) {
  fs.mkdirSync(path.join(process.cwd(), "..", "public", "upload"));
}

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

module.exports = app;
