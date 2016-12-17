var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.getVendors = function(callback) {
    var query = "SELECT * FROM vendor";

    connection.query(query, function (err, result) {
        callback(err, result);
    })
};