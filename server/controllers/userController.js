//var mongoose = require('mongoose');
var User = require('../models/userModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var userController = {};
var config = require('../config/config');

//show all users
userController.list = function(req, res){
  User.find({}).select('-password').exec(function(err, users){
    if(err) {
      console.log("Error:" + err);
      res.status(400).json({err:err});
    }else {
      res.json(users);
    }
  });
}

//show user by ID
userController.show = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function(err, user) {
    if(err) {
      res.status(400).json({err: err});
    }else {
      res.json(user);
    }
  });
}



//create user
userController.signup = (req, res) => {
 var password = req.body.password;
 var email = req.body.email;

 var hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));

  if(hash) {
    const user = new User({
      email: email,
      password: hash
    });

    user.save(function(err){
      if(err) {
        console.log('error'+ err);
        res.status(500).json({err:err});
      }
      else {
        const JWT = jwt.sign({
          email: user.email,
          _id: user.id
        },
        config.secret,
        {
          expiresIn: '2h'
        });
        res.status(200).json({user:user, token: JWT});
      }
    });

  }
}



userController.signin = (req, res) => {
  User.findOne({email: req.body.email}).exec()
  .then(function(user){
    bcrypt.compare(req.body.password,user.password, function(err, result){
      if(err) {
        return res.status(401).json({
          failed:'Unauthorized access'
        });
      }
      if (result)
      {
        const JWT = jwt.sign({
          email: user.email,
          _id: user.id
        },
        config.secret,
        {
          expiresIn: '2h'
        });
        return res.status(200).json({
          success: 'welcome to jwt Auth',
          token: JWT
        });
      }
      return res.status(401).json({
        failed: 'UnAuthorized access'
      });
    });
  }).catch(err => {
      return res.status(500).json({
      err: err
      });
  });
}


userController.update = function(req, res) {
  User.findByIdAndUpdate(
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
       function(err,user){
        if (err) {
          console.log('error al actuai;oxar el usuario' + err );
          res.send('error al actualizar el usuario');
        } else {
          res.json(user);
        }
       });
}

userController.delete = function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
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


module.exports = userController;
