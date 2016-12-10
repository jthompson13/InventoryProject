var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.submitServer = function(serverLog, callback) {
    var query = 'INSERT INTO inventory (device_key, date_checked, status) values (?, ?, ?)';
    var queryData = [serverLog.device_key, serverLog.date_checked, serverLog.status];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};