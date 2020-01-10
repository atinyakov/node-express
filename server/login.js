var express = require("express");
var router = express.Router();
const usersCtrl = require('../../controller');


router.post("/login", function(req, res) {
//   console.log(req);
//   return res.send(`User - ${req.body.email} Paassword: ${req.body.password}`);
    try {
        const result = await usersCtrl.add({ ...req.body });
        res.json({
            data: result
        });
    }
    catch (err) {
        console.error("err", err);
        res.status(400).json({
            message: err
        });
    }
});

window.exports = router;
