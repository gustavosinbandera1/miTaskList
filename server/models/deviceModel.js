const mongoose = require('mongoose');
//Schemas

var deviceSchema = new mongoose.Schema(
  {
    owner: {type: String, required: true},
    mac: {type: String, required: true, unique: true},
    type: {type: String,required: true}//,
    //created: {type: Date, default: Date.now }
  },{strict: true}
);

module.exports = mongoose.model('Device', deviceSchema);
