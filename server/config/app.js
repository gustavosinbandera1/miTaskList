var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//require application routes
var taskRouter2 = require('../routes/taskRouter2');
var deviceRouter = require('../routes/deviceRouter');
const app = express();


////Set our api routes
app.use('/', taskRouter2);
app.use('/device', deviceRouter);

//catch all others routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/myTaskList/index.html') );
})

//bodyparser midleware for parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//point static path to dist
//set static folder
app.use(express.static(path.join(__dirname, '../../dist/myTaskList')));
//set port
app.set('port',process.env.PORT | 8080);
//create server




module.exports = app;
