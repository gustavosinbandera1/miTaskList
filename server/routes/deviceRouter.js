var express = require('express');
var deviceRouter = express.Router();
var deviceController = require('../controllers/deviceController');

//create device C
deviceRouter.post('/device', deviceController.create);
deviceRouter.post('/device_', deviceController.create_);//sql database
//get all devices R
deviceRouter.get('/device', deviceController.list);
deviceRouter.get('/device_', deviceController.list_);
//get simple device by ID
deviceRouter.get('/device/:id', deviceController.show);
deviceRouter.get('/device_/:id_device/:email_user?', deviceController.show_);


//update device U
deviceRouter.put('/device/:id', deviceController.update);
deviceRouter.put('/device_/:id', deviceController.update_);

//delete device D
deviceRouter.post('/device/:id',deviceController.delete);
deviceRouter.delete('/device_/:id_device',deviceController.delete_);



module.exports = deviceRouter;
