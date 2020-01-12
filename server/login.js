var express = require("express");
var router = express.Router();
const usersCtrl = require('../controller');

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', async (req, res) => {
    try {
        const result = await usersCtrl.add({ ...req.body });
        res.redirect('/admin');
    }
    catch (err) {
        res.status(400).json({
            message: err
        });
    }
});

module.exports = router;
