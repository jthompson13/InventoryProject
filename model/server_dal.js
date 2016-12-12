/**
 * Created by Jonathon on 12/9/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM server;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getCount = function(callback) {
  var query = 'SELECT COUNT(*) as count FROM server';

    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.getServerInfo = function(server, callback) {
    var query = 'SELECT * FROM server WHERE serial_number = ? ';
    var queryData = [server];

    connection.query(query, queryData, function (err, result) {
        callback(err, result[0]);
    });
};

exports.deleteServer = function(device_key, callback){
    var query =  'DELETE FROM server WHERE device_key = ? ';
    var queryData = [device_key];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    })
};