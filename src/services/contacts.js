import { ContactCollection } from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (contactInfo) =>
  ContactCollection.create(contactInfo);

export const patchContact = async (_id, contactInfo) => {
  const data = await ContactCollection.findOneAndUpdate({ _id }, contactInfo, {
    new: true,
  });
  return data;
};

export const deleteContact = (_id) =>
  ContactCollection.findOneAndDelete({ _id });
