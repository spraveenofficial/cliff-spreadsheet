import express from 'express';
import catchAsync from '../handlers/catchAsync.js';
import { register } from '../controllers/auth-controller.js';

const Router = express.Router();

Router.post('/register', catchAsync(register));

export default Router;