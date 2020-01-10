var express = require("express");
var router = express.Router();

router.post("/skills", function(req, res) {
  console.log(req);
  return res.send(
    `age - ${req.body.age} concerts : ${req.body.concerts} cities : ${req.body.cities} years : ${req.body.years}`
  );
});


router.post("/upload", function(req, res) {
  console.log(req);
  return res.send(
    `photo - ${req.body.photo} name: ${req.body.name} price: ${req.body.price}`
  );
});

window.exports = router;
