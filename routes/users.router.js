import express from 'express';

import * as UsersController from '../controllers/users.controller.js';
import authenticate from '../middlewares/authenticate.js';

const usersRouter = express.Router();

usersRouter.get('/sign-up', authenticate, UsersController.signUp);
usersRouter.post('/sign-up', authenticate, UsersController.doSignUp);

usersRouter.get('/sign-in', authenticate, UsersController.signIn);
usersRouter.post('/sign-in', authenticate, UsersController.doSignIn);
usersRouter.get('/sign-out', authenticate, UsersController.signOut);

usersRouter.get('/dashboard', authenticate, UsersController.dashboard);

export default usersRouter;
