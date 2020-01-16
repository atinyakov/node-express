const db = require("../db");
const usersCtrl = require("../controller");
const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const serve = require("koa-static");
const session = require("koa-session");
var flash = require("koa-connect-flash");
const path = require("path");
const loginRouter = require("./login");
const adminRouter = require("./admin");
const koaBody = require("koa-body");

app.use(serve("../public"));

app.use(koaBody({
  formidable: {
    uploadDir: '../public/upload', // Директория, куда следует сохранить файл
  },
  multipart: true
}));

app.use(
  session(
    {
      key: "sessionkey",
      maxAge: 86400000,
      overwrite: true,
      httpOnly: true,
      signed: false,
      rolling: false,
      renew: false
    },
    app
    )
    );

    app.use(flash());
    
    const Pug = require("koa-pug");
    
    const pug = new Pug({
      viewPath: path.resolve(__dirname, "..", "source", "template", "pages"),
      basedir: path.resolve(__dirname, "..", "source", "template", "pages"),
      app: app //Equivalent to app.use(pug)
    });
    
    router.get("/", async function(ctx, next) {
      var data = {
        skills: db.get("skills").value(),
        products: db.get("products").value(),
        msgemail: ctx.flash("info")[0]
      };
      await ctx.render("index", data);
    });
    
    router.post("/", async (ctx, next) => {
      const { name, email, message } = ctx.request.body;
      
      if (!name || !email || !message) {
    ctx.flash("info", "Нужно заполнить все поля!");
    ctx.redirect("/");
  } else {
    try {
      const result = await usersCtrl.posts(ctx.request.body);
      if (result) {
        ctx.flash("info", "Отправлено");
        ctx.redirect("/");
      }
    } catch (err) {
      ctx.throw(err.message, 400);
    }
  }
});

app.use(loginRouter.routes()); // определяем в конце приложения
app.use(adminRouter.routes()); // определяем в конце приложения
app.use(router.routes()); // определяем в конце приложения

app.listen(3000, function() {
  console.log("Server running on https://localhost:3000");
});

module.exports = app;