import { Request, Response } from 'express';
import Attendance from '../models/Attendance';

export const markAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, status } = req.body;
    const userId = (req as any).user.id;

    const attendance = new Attendance({
      user: userId,
      date,
      status,
    });

    await attendance.save();

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const attendance = await Attendance.find({ user: userId }).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};