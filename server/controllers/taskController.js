var mongoose = require('mongoose');
var Task = require('../models/taskModel');
var taskController = {};


taskController.list = function(req, res){
  Task.find({}).exec(function(err, tasks){
    if(err) {
      console.log("Error:" + err);
      res.send(err);
    }else {
      res.json(tasks);
    }
  });
}

taskController.show = function (req, res) {
  Task.findOne({_id: req.params.id}).exec(function(err, task){
    if(err){
      res.send(err);
    } else {
      res.json(task);
    }
  });
}

taskController.create = function(req, res){
  var task = new Task(req.body);
  task.save(function(err){
    if(err) {
      console.log('error al crear el objecto task');
      res.send('error a crear el objeto Task');
    } else {
      console.log('se creo la tarea' + task);

      res.json(task);
    }
  });
}

taskController.update = function(req, res) {
  Task.findByIdAndUpdate(
    req.params.id,
    {
      $set:
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isDone: req.body.isDone
      }
    },
    {
      new: true
    },
    function(err, updTask){
      if(err) {
        console.log('se ha producido un error al actualizar' + err);
        res.send('error al actualizar el objeto');
      }
  });
}

taskController.delete = function(req, res) {
  Task.remove({_id: req.params.id}, function(err){
    if(err) {
      log('error al tratar de eliminar la tarea');
      res.json({
        delete: 'failed'
      });
    } else {
      res.json({
        delete: 'success'
      })
    }
  })
}

module.exports = taskController;
