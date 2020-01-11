const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', '../source/template/pages');
app.set('view engine', 'pug');

app.use(express.static('../public', {
  extensions: ['html']
}));

app.use(require('./login'));
app.use(require('./admin'));
  
app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
