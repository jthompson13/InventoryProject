/**
 * Created by Jonathon on 12/9/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Server;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getCount = function(callback) {
  var query = 'SELECT COUNT(*) as count FROM Server';

    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.updateStatus = function (data, callback) {
  var query = "UPDATE server SET current_status= ? WHERE device_key= ? ";
    var queryData = [data.current_status, data.device_key];

    connection.query(query,queryData, function (err, result) {
        callback(err, result);
    });
};

exports.getServerInfo = function(server, callback) {
    var query = 'SELECT * FROM Server WHERE serial_number = ? ';
    var queryData = [server];

    connection.query(query, queryData, function (err, result) {
        callback(err, result[0]);
    });
};

/*
 DELIMITER //
 CREATE PROCEDURE getAllServerInfo (_device_key bigint)
 BEGIN
 SELECT sw.*, dns_name, serial_number, current_status, OS, date_deployed, name,
 phone_number, street, zip, state, sw.start_date, sw.end_date
 FROM server s
 JOIN server_warrenty sw ON sw.device_key = s.device_key
 JOIN vendor v ON s.vendor_id = s.vendor_id
 WHERE EXISTS (
 SELECT policy_id From warrenty
 WHERE sw.policy_id = warrenty.policy_id AND warrenty.device_key = _device_key
 GROUP BY policy_id
 )
 AND sw.device_key = _device_key
 AND s.device_key = _device_key
 AND v.vendor_id = s.vendor_id;
 END //
 DELIMITER ;

 */

exports.getAllServerInfo = function(device_key, callback) {
    var query = 'CALL getAllServerInfo(?)';
    var queryData = [device_key];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.deleteServer = function(device_key, callback){
    var query =  'DELETE FROM Server WHERE device_key = ? ';
    var queryData = [device_key];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    })
};

exports.addServer = function(newServer, callback) {
    var query = "INSERT INTO Server (dns_name, serial_number, current_status, OS, date_deployed, vendor_id) values( ?, ?, ?, ?, ?, ? )";

    var queryData = [newServer.dns_name, newServer.serial_number, newServer.current_status, newServer.OS,
        newServer.date_deployed,
        newServer.vendor_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    })
};