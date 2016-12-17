var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.addWarranty = function(warranty, callback) {
    var query = "INSERT INTO warrenty (device_key, vendor_id) values (?, ? )";

    var queryData = [warranty.device_key, warranty.vendor_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.addServer_Warranty = function (data, callback) {
    var query = "INSERT INTO server_warrenty (device_key, policy_id, start_date, end_date) values (?, ?, ?, ? )";

    var queryData = [data.device_key, data.policy_id, data.start_date, data.end_date];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};