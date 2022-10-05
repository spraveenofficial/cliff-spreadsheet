import express from 'express';
import catchAsync from '../handlers/catchAsync.js';
import { addGoogleAccount, googleCallback, removeGoogleAccount } from '../controllers/google-controller.js';
import { checkAuth } from '../middlewares/auth-middleware.js';


const Router = express.Router();

//Global Middleware for this route 
Router.use(checkAuth);

Router.post('/add', catchAsync(addGoogleAccount));
Router.get('/callback', catchAsync(googleCallback));
Router.post('/remove', catchAsync(removeGoogleAccount));


export default Router;
