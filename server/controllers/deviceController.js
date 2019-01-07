//var mongoose = require('mongoose');
var Device = require('../models/deviceModel');
var deviceController = {};

//show all devices
deviceController.list = function(req, res){
  Device.find({}).exec(function(err, devices){
    if(err) {
      console.log("Error:" + err);
      res.status(400).json({err:err});
    }else {
      res.json(devices);
    }
  });
}

//show device by ID
deviceController.show = function(req, res) {
  Device.findOne({_id: req.params.id}).exec(function(err, device) {
    if(err) {
      res.status(400).json({err: err});
    }else {
      res.json(device);
    }
  });
}

//create device
deviceController.create = function(req, res) {
  console.log('la peticion device');
  console.log(req.body);


  var device = new Device(req.body);
  device.save(function(err){
    if(err) {
      res.status(400).json({err:err});
    } else {
      console.log('usuario creadom con exito');
      res.json(device);
    }
  });
}

deviceController.update = function(req, res) {
  Device.findByIdAndUpdate(
      req.params.id,
      {
        $set:{
          mac: req.body.mac,
          type: req.body.type,
          created: req.body.created
        }
      },
      {
        new:true
      },
       function(err,device){
        if (err) {
          console.log('error al actuai;oxar el usuario' + err );
          res.send('error al actualizar el usuario');
        } else {
          res.json(device);
        }
       });
}

deviceController.delete = function(req, res) {
  Device.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log('error al tratar de eliminar el dispositivo');
      res.json({
        delete: 'failed'
      });
    }else {
      res.json({
        delete: 'success'
      });
    }
  });
}


module.exports = deviceController;
