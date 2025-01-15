import { Router } from 'express';

import * as controllers from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../utils/validateBody.js';
import {
  addContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(controllers.getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(controllers.getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(addContactSchema),
  ctrlWrapper(controllers.addContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(controllers.patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(controllers.deleteContactController),
);

export default contactsRouter;
