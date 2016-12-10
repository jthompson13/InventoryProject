var express = require('express');
var router = express.Router();
var log_dal = require('../model/log_dal');
var server_dal = require('../model/server_dal');
var inventory_dal = require('../model/inventory_dal');

router.get('/entry', function(req, res, next) {
    res.render('log_view/logs', { title: 'Inventory Page' });
});

router.get('/getAllLogs', function(req, res) {
    log_dal.getLogs(function(err, result){
        return res.json(result);
    });
});

module.exports = router;