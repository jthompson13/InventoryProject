var express = require('express');
var router = express.Router();

router.get('/entry', function(req, res, next) {
res.render('about', { title: 'About' });
});

module.exports = router;