var mongoose = require('mongoose');
var User = require('../models/userModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var userController = {};

//show all users
userController.list = function(req, res){
  User.find({}).exec(function(err, users){
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
    if(errr) {
      res.status(400).json({err: err});
    }else {
      res.json(user);
    }
  });
}



//create user
userController.signup = (req, res) => {
  console.log('la peticion  ');
  console.log(req.body);


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
    }else {
      res.json({user});
    }
  });

}
/*  bcrypt.hash(password, 10 , (err, hash) => {
    if(err) {
      return res.status(500).json({ err:err });
    }else {
      const user = new User({
        _id: mongoose.Types.ObjectId,
        email: email,
        password: hash
      });

      user.save(function(err){
        if(err) {
          console.log('error');
          res.status(500).json({err:err});
        }else {
          res.json({user});
        }
      });
    }
  });*/

}



userController.signin = (req, res) => {
  User.findOne({email: req.body.email}).exec().then(function(user){
    bcrypt.compare(req.body.password,user.password, function(err, result){
      if(err) {
        return res.status(401).json({
          failed:'Unauthorized access'
        });
      }
      if (result) {
        const JWT = jwt.sign({
          email: user.email,
          _id: user.id
        },
        'secret',
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
