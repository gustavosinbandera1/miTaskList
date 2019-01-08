const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const middleware= require('../middlewares/userMiddlewar');

//signup
userRouter.post('/signup', userController.signup);
//signin
userRouter.post('/signin', userController.signin);

//get user list
userRouter.get('/list',middleware.checkToken,userController.list);

//get user
userRouter.get('/:id', middleware.checkToken, userController.show);



//update
userRouter.put('/:id', middleware.checkToken, userController.update);

//delete
userRouter.post('/:id',middleware.checkToken, userController.delete);

module.exports = userRouter;
