import express from 'express';

import * as UsersController from '../controllers/users.controller.js';
import authenticate from '../middlewares/authenticate.js';
import ifLoggedIn from '../middlewares/ifLoggedIn.js';

const usersRouter = express.Router();

usersRouter.get('/sign-up', ifLoggedIn, UsersController.signUp);
usersRouter.post('/sign-up', ifLoggedIn, UsersController.doSignUp);

usersRouter.get('/sign-in', ifLoggedIn, UsersController.signIn);
usersRouter.post('/sign-in', ifLoggedIn, UsersController.doSignIn);

usersRouter.get('/dashboard', authenticate, UsersController.dashboard);

export default usersRouter;
