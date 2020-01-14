// var express = require("express");
// var router = express.Router();
// const usersCtrl = require('../controller');
// const Koa = require('koa');

const Router = require('koa-router');
const router = new Router({ prefix: '/login' })

router.get("/", async (ctx, res) => {
  await ctx.render("login");
});

// router.post('/login', async (req, res) => {
//     try {
//         const result = await usersCtrl.add({ ...req.body });
//         res.redirect('/admin');
//     }
//     catch (err) {
//         res.status(400).json({
//             message: err
//         });
//     }
// });

module.exports = router;
