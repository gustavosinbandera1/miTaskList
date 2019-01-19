var Device = require('../models/deviceModel');//communication with mongodb db
var deviceController = {};
var db  = require('../sqlSerices/sqlQuery'); ///connecto to sql database


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

  if(!req.body.owner || !req.body.mac || !req.body.type){
    res.status(500).json({err: 'bad data'});
  }
  var device = new Device(req.body);
  device.save(function(err){
    if(err) {
      res.status(400).json({err:err});
    } else {
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

/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//show all devices
deviceController.list_ = function(req, res){
  var query ='select * from devices';
  db.sendQuery(query, function(err, devices){
    if(err) {
      res.status(400).json({error:'Hubo un error'});
    }
    res.send(devices);
  });
}

//show device by id_device or owner
deviceController.show_ = function(req, res) {
  var userId = req.params.id_device;
  console.log('el id es  ', userId);

  //get device by id
  if(req.params.id_device != '*') {
    const query = `select * from devices where id_user="${userId}"`;

    db.senQuery(query, function(err, device) {
      if(err) {
        res.status(400).json({error:'Hubo un error'});
      }
      res.send(device);
    });
  }//get device by owner
   else if(req.params.id_device == '*' && req.params.email_user){
    const query = `select * from devices where email_user = "${req.params.email_user}"`;

    db.sendQuery(query, function(err, devices) {
      if(err) {
        res.status(400).json({error:'Hubo un error', error: err});
      }
      res.send(devices);
    });
  }else {
    res.status(400).json({status: 'bad Request'});
  }
}

//create device
deviceController.create_ = function(req, res) {
  if(!req.body.name_device || !req.body.mac_device || !req.body.email_user){
    res.status(500).json({err: 'bad data'});
  }
  let name_device = req.body.name_device;
  let mac_device = req.body.mac_device;
  let email_user = req.body.email_user;

//we can check if mac exist
    var query = `insert into devices (name_device, mac_device, email_user) values("${name_device}", "${mac_device}", "${email_user}")`;
    db.sendQuery(query, function(err, device){
      if(err) {
        res.status(400).json({error:err});
      }
      res.json(device);
    });
}

deviceController.update_ = function(req, res) {

}

deviceController.delete_ = function(req, res) {
  var query= `delete from devices where id_device = ${req.params.id_device}`
  db.sendQuery(query, function(err, device){
    if(err) {
      res.status(400).json({error:err});
    }
    res.json(device);
  });
}

checkIfMacExist = (mac) =>{
 return false;
}

module.exports = deviceController;
