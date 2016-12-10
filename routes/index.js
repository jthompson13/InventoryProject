var express = require('express');
var router = express.Router();
var server_dal = require('../model/server_dal');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inventory Project' });
});

router.get('/servers', function(req, res, next) {
  server_dal.getAll(function(err, result) {
    return res.json(result)
  });


});

router.get('/serverCount', function(req, res, next) {
  server_dal.getCount(function(err, result){
    return res.json({count: result[0].count});
  });
});

module.exports = router;
