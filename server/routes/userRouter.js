const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');


//signup
userRouter.post('/signup', userController.signup);
//signin
userRouter.post('/signin', userController.signin);

//get
userRouter.get('/', userController.list);

//get
userRouter.get('/:id', userController.show);



//update
userRouter.put('/:id', userController.update);

//delete
userRouter.post('/:id',userController.delete);

module.exports = userRouter;
