var express = require('express');
var router = express.Router();
const usersCtrl = require('../controller')
const validation = require('../utils/validation');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

router.get('/admin', (req,res) => {
  res.render('admin')
})

router.post('/admin/skills', async (req, res) => {
  const { age, concerts, cities, years } = req.body;
  // console.log('age', age)
  const errors = validation.skills({ age, concerts, cities, years });
  if (errors.length) {
    req.flash('info', errors.join('. '));
    res.redirect('/admin');
  } else {
    try {
        const result = await usersCtrl.skills({ ...req.body });

        if(result) {
          // let data = {
          //   msgskill: req.flash('info', 'Навыки обновлены'),
          // }

          // console.log(data)
          req.flash('info', 'Навыки обновлены');
          res.redirect(302, '/admin');
        }
    }
    catch (err) {
        console.error("err", err);
        res.status(400).json({
            message: err
        });
    }
  }
});


router.post('/admin/upload', function(req, res) {
  const form = new formidable.IncomingForm();
  const upload = path.join('..', 'public', 'upload');


  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(upload);
  console.log(req)

  form.parse(req, function(err, fields, files) {
    if (err) {
      // console.log(files)
      if (fs.existsSync(files.photo.path)) {
        fs.unlinkSync(files.photo.path);
      }
      req.flash('form-info', 'Возникла ошибка при обработке');
      res.redirect('/admin');
    }

    const { name: title, price } = fields;
    const { name, size } = files.photo;
    const errors = validation.uploadFile({ name, size, title, price });
    if (errors.length) {
      if (fs.existsSync(files.photo.path)) {
        fs.unlinkSync(files.photo.path);
      }
      req.flash('form-info', errors.join('. '));
      res.redirect('/admin');
    } else {
      const fileName = path.join(upload, files.photo.name);
      fs.renameSync(files.photo.path, fileName);
      // removes the server\\public a part of the path
      const dir = fileName.replace('server\\public', '');

      db.defaults({ products: [] })
        .get('products')
        .push({ src: dir, name: title, price })
        .write();

      req.flash('form-info', 'Форма обработана');
      res.redirect('/admin');
    }
  });
});

module.exports = router;
