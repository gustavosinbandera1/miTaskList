const mongoose = require('mongoose');
var taskSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    isDone: Boolean
  }
);

module.exports = mongoose.model('Task', taskSchema);
