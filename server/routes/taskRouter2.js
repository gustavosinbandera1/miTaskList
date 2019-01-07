var express = require('express');
var taskRouter = express.Router();
var taskController = require('../controllers/taskController');

//create device C
taskRouter.post('/task', taskController.create);

//get all devices R
taskRouter.get('/task', taskController.list);

//get simple device by ID
taskRouter.get('/task/:id', taskController.show);



//update device U
taskRouter.put('/task/:id', taskController.update);

//delete device D
taskRouter.post('/task/:id',taskController.delete);

module.exports = taskRouter;
