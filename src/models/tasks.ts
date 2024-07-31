import mongoose, { Schema, model } from 'mongoose';
import { ITask } from '../types/tasks';

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
}, { timestamps: true });

export default model<ITask>('Task', taskSchema);
