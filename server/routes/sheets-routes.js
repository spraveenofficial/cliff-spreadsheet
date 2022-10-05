import express from 'express';
import catchAsync from '../handlers/catchAsync.js';
import { checkAuth } from '../middlewares/auth-middleware.js';
import { getEachAccountSheets, addTracking, getAllTracking, deleteTracking } from '../controllers/sheets-controller.js';

const router = express.Router();

router.use(checkAuth);

router.post('/data', catchAsync(getEachAccountSheets));
router.post('/add', catchAsync(addTracking));
router.get('/trackings', catchAsync(getAllTracking));
router.delete('/trackings/:trackingId', catchAsync(deleteTracking));

export default router;