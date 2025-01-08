import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for a User
export interface IUser extends Document<Types.ObjectId> {
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the User schema
const UserSchema: Schema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
    }, { timestamps: true }
);

// Create the User model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
