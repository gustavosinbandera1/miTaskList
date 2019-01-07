var express = require('express');
var deviceRouter = express.Router();
var deviceController = require('../controllers/deviceController');

//create device C
deviceRouter.post('/device', deviceController.create);

//get all devices R
deviceRouter.get('/device', deviceController.list);

//get simple device by ID
deviceRouter.get('/device/:id', deviceController.show);



//update device U
deviceRouter.put('/device/:id', deviceController.update);

//delete device D
deviceRouter.post('/device/:id',deviceController.delete);

module.exports = deviceRouter;
