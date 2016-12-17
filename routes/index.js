var express = require('express');
var router = express.Router();
var server_dal = require('../model/server_dal');
var vendor_dal = require('../model/vendor_dal');
var warranty_dal = require('../model/warranty_dal');
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

router.get('/UpdateStatus', function (req, res) {
    server_dal.updateStatus(req.query, function(err, result) {

    });
});

router.get('/delete', function(req, res) {
  server_dal.deleteServer(req.query.device_key, function (err, result) {
    if(err){
      console.log(err);
      return res.json({result: false});
    }

    return res.json({result: true});

  });
});


router.get('/getVendors', function (req, res) {
  vendor_dal.getVendors(function (err, result) {
    return res.json(result);
  });
});

router.get('/allServerInfo', function (req, res) {
  server_dal.getAllServerInfo(req.query.device_key, function (err, result) {
    return res.json(result[0][0]);
  })
});

router.get('/newServer', function (req, res) {
  var data = req.query;
  server_dal.addServer(data, function(err, result) {
    if(!err) {
      var warranty = {device_key: result.insertId, vendor_id: data.vendor_id};
      var key = result.insertId;
      warranty_dal.addWarranty(warranty, function (err, result2) {
      if(!err){
        var data2 = {device_key: key, policy_id: result2.insertId, start_date: data.start_date, end_date: data.end_date};
        warranty_dal.addServer_Warranty(data2, function (err, result3) {
          return res.json({'result': "complete"});
        });
      }

      });


    }
  });
});

module.exports = router;
