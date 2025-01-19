import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for a Blood Pressure Reading
export interface IBloodPressureReading extends Document<Types.ObjectId> {
    userId: mongoose.Types.ObjectId; // Reference to the User model
    systolic: number;
    diastolic: number;
    pulse: number;
    timestamp: Date;
    notes?: string;
}

// Define the Blood Pressure Reading schema
const BloodPressureReadingSchema: Schema = new Schema<IBloodPressureReading>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        systolic: { type: Number, required: true, min: 50, max: 250 },
        diastolic: { type: Number, required: true, min: 30, max: 150 },
        pulse: { type: Number, required: true, min: 30, max: 200 },
        timestamp: { type: Date, default: Date.now },
        notes: { type: String }
    },
    { timestamps: true }
);

// Create the Blood Pressure Reading model
const BloodPressureReading = mongoose.model<IBloodPressureReading>(
    'BloodPressureReading',
    BloodPressureReadingSchema
);

export default BloodPressureReading;
