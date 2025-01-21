import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constants/users.js';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const UserCollection = model('user', userSchema);

export default UserCollection;
