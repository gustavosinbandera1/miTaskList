var config = require('../config/config');
var User = require('../models/userModel');
var jwt = require('jsonwebtoken');
 var Obj = {};
  Obj.checkToken = function(req, res, next){
    var token = req.headers['x-access-token'];
    if(!token){
      return res.status(401).json({auth:false, message: 'No token provided.'});
    }
    jwt.verify(token,config.secret,function(err, decode){
      if(err){
        return res.status(500).json({auth:false, message: 'failed to authenticate token.'});
      }
      User.findOne({_id: decode._id}).exec(function(err, user){
        if(err) {
          return res.status(500).json({err: err, message: "there was a problem finding the user"});
        }
        if(!user){
          return res.status(404).json({message: 'user not found'});
        }
        next();
      });
    });
  }

 module.exports = Obj;
