import { ContactCollection } from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (contactInfo) =>
  ContactCollection.create(contactInfo);

export const patchContact = async (_id, contactInfo) => {
  await ContactCollection.findOneAndUpdate({ _id }, contactInfo);
};
