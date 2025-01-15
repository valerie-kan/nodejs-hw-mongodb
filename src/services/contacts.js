import { ContactCollection } from '../db/models/Contact.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const contactsQuery = ContactCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  const totalItems = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getContactById = (filter) => ContactCollection.findById(filter);

export const addContact = (contactInfo) =>
  ContactCollection.create(contactInfo);

export const patchContact = async (filter, contactInfo) => {
  const data = await ContactCollection.findOneAndUpdate(filter, contactInfo, {
    new: true,
    runValidators: true,
  });
  return data;
};

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
