import { sortByList } from '../db/models/Contact.js';

const sortOrderList = ['asc', 'desc'];

export const parseSortParams = ({ sortBy, sortOrder }) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : 'asc';

  const parsedSortBy = sortByList.includes(sortBy) ? sortBy : 'name';

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
