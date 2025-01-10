import { contactTypes } from '../../constants/contacts.js';

export const parseType = (type) => {
  if (contactTypes.includes(type)) return type;
};

export const parseContactsFilter = ({ type, isFavourite }) => {
  const parsedContactsType = parseType(type);

  return {
    type: parsedContactsType,
    isFavourite,
  };
};
