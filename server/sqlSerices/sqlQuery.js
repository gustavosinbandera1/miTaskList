var mysql = require('mysql');

var pool = mysql.createPool({
  //host: 'localhost',
  host: 'iotdb.c9e4ojgpehwj.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'root',
    password: 'nicolas901028',
    database: 'iotdb'
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


