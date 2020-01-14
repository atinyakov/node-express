const db = require("../db");
// var cookieParser = require("cookie-parser");
// const usersCtrl = require("../controller");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cookieParser("keyboard cat"));
// app.use(
//   session({
//     cookie: { maxAge: 60000 },
//     secret: "woot",
//     resave: false,
//     saveUninitialized: false
//   })
// );

// app.set("views", "../source/template/pages");
// app.set("view engine", "pug");

// app.use(
//   express.static("../public", {
//     extensions: ["html"]
//   })
// );

// app.use(require("./login"));
// app.use(require("./admin"));

// app.get("/", function(req, res) {
//   var data = {
//     skills: db.get("skills").value(),
//     products: db.get("products").value(),
//     msgemail: req.flash("info")[0]
//   };
//   res.render("index", data);
// });

// app.post("/", async (req, res) => {
//   console.log(...req.body)
//   if (!req.body.name || !req.body.email || !req.body.message) {
//     req.flash("info", "Нужно заполнить все поля!");
//     res.redirect("/");
//   } else {
//     try {
//       const result = await usersCtrl.posts({ ...req.body });
//       if (result) {
//         req.flash("info", "Отправлено");
//         res.redirect("/");
//       }
//     } catch (err) {
//       res.status(400).json({
//         message: err.message
//       });
//     }
//   }
// });

// app.listen(3000, function() {
//   console.log("Example app listening on port 3000!");
// });

// module.exports = app;

const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const serve = require('koa-static');
const session = require('koa-session');
var flash = require('koa-connect-flash');
const path = require('path')
const loginRouter = require('./login')
const adminRouter = require('./admin')

app.use(serve('../public') );

app.use(
  session(
    {
      key: 'sessionkey',
      maxAge: 86400000,
      overwrite: true,
      httpOnly: true,
      signed: false,
      rolling: false,
      renew: false,
    },
    app
  )
);

app.use(flash());

const Pug = require('koa-pug') ;

const pug = new Pug({
    viewPath: path.resolve(__dirname,'..', 'source', 'template', 'pages'),
    basedir: path.resolve(__dirname,'..', 'source', 'template', 'pages'),
    app: app //Equivalent to app.use(pug)
});


router.get('/', async function(ctx, next) {
    var data = {
    skills: db.get("skills").value(),
    products: db.get("products").value(),
    msgemail: ctx.flash("info")[0]
  };
  await ctx.render('index', data);
});



app.use(loginRouter.routes()); // определяем в конце приложения
app.use(adminRouter.routes()); // определяем в конце приложения
app.use(router.routes()); // определяем в конце приложения

app.listen(3000, function() {
    console.log('Server running on https://localhost:3000')
});