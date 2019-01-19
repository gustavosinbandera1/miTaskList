const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const middleware= require('../middlewares/userMiddlewar');

//signup
userRouter.post('/signup', userController.signup);
userRouter.post('/signup_', userController.signup_);
//signin
userRouter.post('/signin', userController.signin);
userRouter.post('/signin_', userController.signin_);

//get user list
userRouter.get('/list',middleware.checkToken,userController.list);
userRouter.get('/list_',middleware.checkToken,userController.list_);
//get user
userRouter.get('/:id', middleware.checkToken, userController.show);
userRouter.get('/:id_user', middleware.checkToken, userController.show_);


//update
userRouter.put('/:id', middleware.checkToken, userController.update);
userRouter.put('/:id', middleware.checkToken, userController.update_);
//delete
userRouter.post('/:id',middleware.checkToken, userController.delete);
userRouter.post('/:id_user',middleware.checkToken, userController.delete_);

module.exports = userRouter;
