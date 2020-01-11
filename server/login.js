var express = require("express");
var router = express.Router();
const usersCtrl = require('../controller');

router.get('/login', (req, res) => {
    console.log('here')
    res.render('login');
})

router.post('/login', async (req, res) => {
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

module.exports = router;
