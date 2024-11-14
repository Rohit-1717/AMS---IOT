import express from 'express';
import { markAttendance, getAttendance } from '../controllers/attendanceController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', auth, markAttendance);
router.get('/', auth, getAttendance);

export default router;