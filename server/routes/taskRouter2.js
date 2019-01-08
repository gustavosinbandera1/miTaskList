var express = require('express');
var taskRouter = express.Router();
var taskController = require('../controllers/taskController');

//create device C
taskRouter.post('/', taskController.create);

//get all devices R
taskRouter.get('/', taskController.list);

//get simple device by ID
taskRouter.get('/:id', taskController.show);



//update device U
taskRouter.put('/:id', taskController.update);

//delete device D
taskRouter.post('/:id',taskController.delete);

module.exports = taskRouter;
