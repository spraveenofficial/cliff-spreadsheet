import express from 'express';
import catchAsync from '../handlers/catchAsync.js';
import { register, login, checkUsername, getProfile } from '../controllers/auth-controller.js';
import { checkAuth } from '../middlewares/auth-middleware.js';
const Router = express.Router();

Router.post('/register', catchAsync(register));
Router.post('/login', catchAsync(login));
Router.post('/username', catchAsync(checkUsername));
Router.get('/profile', checkAuth, catchAsync(getProfile));

export default Router;