const usersCtrl = require('../controller');
const validation = require('../utils/validation');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const flash = require('koa-connect-flash');
const db = require("../db");
const Router = require("koa-router");
const router = new Router({ prefix: "/admin" });

router.get("/", async ctx => {
  console.log(`beforadmin`)

  var data = {
    msgskill: ctx.flash("info")[0],
    msgfile: ctx.flash("form-info")[0],
    skills: db.get("skills").value()
  };
  await ctx.render("admin", data);
});

router.post("/skills", async (ctx, next) => {
  const { age, concerts, cities, years } = ctx.request.body;

  const errors = validation.skills({ age, concerts, cities, years });
  if (errors.length) {
    ctx.flash("info", errors.join(". "));
    ctx.redirect("/admin");
  } else {
    try {
      const result = await usersCtrl.skills(ctx.request.body);

      if (result) {
        ctx.flash("info", "Навыки обновлены");
        ctx.redirect("/admin");
      }
    } catch (err) {
      ctx.throw(err.message, 400);
    }
  }
});

router.post("/upload", async (ctx, next) => {
  const { name: title, price } = ctx.request.body;
  const { name, size, path: filePath } = ctx.request.files.photo;

  const errors = validation.uploadFile({ name, size, title, price });
  if (errors.length) {
    fs.unlinkSync(filePath);
    ctx.flash('form-info', errors.join('. '));
    ctx.redirect('/admin');
  } else {
    const fileName = path.join(
      process.cwd(),
      '..',
      'public',
      'upload',
      name
      );
      // console.log(filePath)
    fs.rename(filePath, fileName, err => {
      if (err) {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        ctx.flash('form-info', 'Возникла ошибка при обработке');
        ctx.redirect('/admin');
      } else {
        const dir = path.join('upload', name);
        db.defaults({ products: [] })
          .get('products')
          .push({ src: dir, name: title, price })
          .write();

        ctx.flash('form-info', 'Форма обработана');
      console.log(`beforadmin`)

        ctx.redirect('/admin');
      }
    });
  }
});

module.exports = router;
