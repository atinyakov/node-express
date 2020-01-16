// var express = require("express");
// var router = express.Router();
const usersCtrl = require('../controller');
// const Koa = require('koa');

const Router = require('koa-router');
const router = new Router({ prefix: '/login' })

router.get("/", async (ctx, next) => {
  await ctx.render("login");
});

router.post('/', async (ctx, next) => {
    try {
        await usersCtrl.add({ ...ctx.request.body });
        ctx.redirect('/admin');
    }
    catch (err) {
        ctx.throw(err.message, 400)
    }
});

module.exports = router;
