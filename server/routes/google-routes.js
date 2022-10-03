import express from 'express';
import catchAsync from '../handlers/catchAsync.js';
import { addGoogleAccount, googleCallback, removeGoogleAccount } from '../controllers/google-controller.js';
import { checkAuth } from '../middlewares/auth-middleware.js';


const Router = express.Router();

Router.post('/add', checkAuth, catchAsync(addGoogleAccount));
Router.get('/callback', checkAuth, catchAsync(googleCallback));
Router.post('/remove', checkAuth, catchAsync(removeGoogleAccount));


export default Router;
