import express from 'express';
import catchAsync from '../handlers/catchAsync.js';
import { checkAuth } from '../middlewares/auth-middleware.js';
import { getSheets, getEachAccountSheets, addTracking, getAllTracking, deleteTracking } from '../controllers/sheets-controller.js';

const router = express.Router();

router.get('/', checkAuth, catchAsync(getSheets));
router.post('/data', checkAuth, catchAsync(getEachAccountSheets));
router.post('/add', checkAuth, catchAsync(addTracking));
router.get('/trackings', checkAuth, catchAsync(getAllTracking));
router.delete('/trackings/:trackingId', checkAuth, catchAsync(deleteTracking));

export default router;