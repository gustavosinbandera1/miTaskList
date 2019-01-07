var express = require('express');
var deviceRouter = express.Router();
var deviceController = require('../controllers/deviceController');

//create device C
deviceRouter.post('/', deviceController.create);

//get all devices R
deviceRouter.get('/', deviceController.list);

//get simple device by ID
deviceRouter.get('/:id', deviceController.show);



//update device U
deviceRouter.put('/:id', deviceController.update);

//delete device D
deviceRouter.post('/:id',deviceController.delete);

module.exports = deviceRouter;
