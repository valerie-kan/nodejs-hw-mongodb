import { Router } from 'express';

import * as controllers from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(controllers.getContactsController));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(controllers.getContactByIdController),
);

contactsRouter.post('/', ctrlWrapper(controllers.addContactController));

contactsRouter.patch(
  '/:contactId',
  ctrlWrapper(controllers.patchContactController),
);

export default contactsRouter;
