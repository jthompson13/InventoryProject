var express = require('express');
var router = express.Router();
var server_dal = require('../model/server_dal');
var inventory_dal = require('../model/inventory_dal');

router.get('/entry', function(req, res, next) {
    res.render('inventory_view/inventory', { title: 'Inventory Page' });
});

router.get('/submit', function(req, res){
    var serverId = '';
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();

    newdate = year + "-" + month + "-" + day;

    server_dal.getServerInfo(req.query.serial_number, function(err, result){
        if(err == null) {
            serverId = result.device_key;
            var serverLog = {
                'device_key': result.device_key,
                'date_checked': newdate ,
                'status': result.current_status
            };
            inventory_dal.submitServer(serverLog, function (err, result) {
                return res.json(serverId);
            });
        }
    });
});




module.exports = router;