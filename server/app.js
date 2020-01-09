const express = require("express");
const app = express(),
  fs = require("fs"),
  nconf = require("nconf");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.post("/login", function(req, res) {
  //   res.send('Hello World!');
  //   nconf.set("database:host", "127.0.0.1");
  //   nconf.set("database:port", 5984);
  console.log(req);
  return res.send(`User - ${req.body.email} Paassword: ${req.body.password}`);
  // Save the configuration object to disk
  //
  //   nconf.save(function(err) {
  //     fs.readFile("path/to/your/config.json", function(err, data) {
  //       console.dir(JSON.parse(data.toString()));
  //     });
  //   });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
