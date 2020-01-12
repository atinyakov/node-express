const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../db");
var flash = require("connect-flash");
var session = require("express-session");
var connect = require("connect");
var cookieParser = require("cookie-parser");

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
    skills: db.get("skills").value()
  };
  res.render("index", data);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

module.exports = app;
