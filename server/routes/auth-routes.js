import express from 'express';
import catchAsync from '../handlers/catchAsync.js';
import { register, login, checkUsername } from '../controllers/auth-controller.js';

const Router = express.Router();

Router.post('/register', catchAsync(register));
Router.post('/login', catchAsync(login));
Router.post('/username', catchAsync(checkUsername));

export default Router;