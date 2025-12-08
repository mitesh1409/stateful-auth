import express from 'express';

import * as UsersController from '../controllers/users.controller.js';
import authenticate from '../middlewares/authenticate.js';

const usersRouter = express.Router();

usersRouter.get('/sign-up', UsersController.signUp);
usersRouter.post('/sign-up', UsersController.doSignUp);

usersRouter.get('/sign-in', UsersController.signIn);
usersRouter.post('/sign-in', UsersController.doSignIn);

usersRouter.get('/dashboard', authenticate, UsersController.dashboard);

export default usersRouter;
