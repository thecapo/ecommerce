import mongoose, { Schema, Document, model } from 'mongoose';

// Define a TypeScript interface for your document
export interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
}

// Define the Mongoose schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/^.+@.+\..+$/, 'Invalid email format'],
    unique: true
  },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Create the model
export const User = model<IUser>('User', UserSchema);
