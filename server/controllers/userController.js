//var mongoose = require('mongoose');
var User = require('../models/userModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var userController = {};
var config = require('../config/config');
var db  = require('../sqlSerices/sqlQuery'); ///connecto to sql database

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//show all users
userController.list_ = function(req, res){
  var query ='select * from users';
  db.sendQuery(query, function(err, users){
    if(err) {
      res.status(400).json({error:'Hubo un error'});
    }
    res.send(users);
  });
}

//show user by ID
userController.show_ = function(req, res) {
  var userId = req.params.id_user;
  console.log('el id es  ', userId);
  //get user by id
  if(userId) {
    const query = `select * from devices where id_user="${userId}"`;
    db.senQuery(query, function(err, user) {
      if(err) {
        res.status(400).json({error:'Hubo un error'});
      }
      res.send(user);
    });
  }
}


//create user
userController.signup_ = (req, res) => {
  var password = req.body.password_user;
  var email_user = req.body.email_user;
  var name_user = req.body.name_user;
  console.log("los datos son", req.body);
  var hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));

  var query = `insert into users (name_user, email_user, password_user) values("${name_user}", "${email_user}", "${hash}")`;
     db.sendQuery(query, function(err, user){
      if(err) {
        res.status(400).json({status: 'error'});
      }else {
        const JWT = jwt.sign({
          email: user.email_user,
          name: name_user
        },
        config.secret,
        {
          expiresIn: '2h'
        });
        res.status(200).json({user:user, token: JWT});
      }
    });
  }


userController.signin_ = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var query = `select * from users where email_user = "${email}"`;
  db.sendQuery(query, function(err, user){
    if(err) {
      res.status(400).json({status: 'error'});
    }else {
      bcrypt.compare(password, user.id_user, function(err, status){
        if(err) {
          return res.status(401).json({
            status: 'Unauthorized access '
          });
        }
        if(status) {
          const JWT = jwt.sign({
            email: user.email_user,
            id: user.id_user
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
      });
    }
  });
}


userController.update_ = function(req, res) {
  var name_user = req.body.name_user;
  var email_user = req.body.email_user;
  var pssword_user = req.body.password_user;

  var query = `select * from users where email_user="${email_user}"`;
  db.sendQuery(query, function(err, user){
    if(err) {
      res.status(400).json({status: 'error'});
    }else {
      if(req.body.email_user !== user.email_user) {
        res.status(401).json({status: 'usted no tiene permisos'});
      }else {
         query = `update users set name_user="${name_user}",email_user="${email_user}" where email_user="${email_user}" `;
         db.sendQuery(query, function(err, user){
           if(err) {
             res.status(400).json({status:'error'});
           }else{
             res.json(user);
           }
         });
      }
    }
  });
}

userController.delete_ = function(req, res) {
  var query= `delete from users where id_user = ${req.params.id_user}`
  db.sendQuery(query, function(err, user){
    if(err) {
      res.status(400).json({error:err});
    }
    res.json(user);
  });
}
















module.exports = userController;
