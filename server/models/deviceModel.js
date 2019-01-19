const mongoose = require('mongoose');
//Schemas

var deviceSchema = new mongoose.Schema(
  {
    owner: {type: String, required: true},  //email
    mac: {type: String, required: true, unique: true},//mac is a room name to socket.io connection
    type: {type: String,required: true},
    name: {type: String, required: true}//alias unico
    //created: {type: Date, default: Date.now }
  },{strict: true}
);

module.exports = mongoose.model('Device', deviceSchema);
