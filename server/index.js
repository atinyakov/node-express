const express = require("express");
const app = express(),
  fs = require("fs"),
  nconf = require("nconf");
var bodyParser = require("body-parser");

const router = express.Router();

router.use('/login', require('./login'));
router.use('/admin', require('./admin'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.post("/", function(req, res) {
  console.log(req);
  return res.send(`Name - ${req.body.name} Email - ${req.body.email} Message: ${req.body.message}`);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
