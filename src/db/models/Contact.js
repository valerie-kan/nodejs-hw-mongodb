import { Schema, model } from 'mongoose';
import { contactTypes } from '../../constants/contacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypes,
      default: 'personal',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const ContactCollection = model('contact', contactSchema);

export const sortByList = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];
