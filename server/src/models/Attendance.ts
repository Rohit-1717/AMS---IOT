import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendance extends Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  status: 'present' | 'absent';
}

const AttendanceSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent'], required: true },
});

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);