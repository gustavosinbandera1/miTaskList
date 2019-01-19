var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'localhost',
    user: 'root',
    password: 'nicolas901028',
    database: 'iot_db'
  /* host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
  supportBigNumbers: true */
});

// Get records from a city
exports.sendQuery = function(args, callback) {
  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(args, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
};


