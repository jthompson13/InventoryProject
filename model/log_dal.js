var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getLogs = function(callback) {
    var query = 'SELECT * FROM logs_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};