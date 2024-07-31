import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description?: string;
    isComplete: boolean;
    createdBy:{
        type: mongoose.Types.ObjectId
    }
}
