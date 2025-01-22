import { Router } from 'express';

import { validateBody } from '../utils/validateBody.js';

import * as validation from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as controllers from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(validation.registerUserSchema),
  ctrlWrapper(controllers.registerController),
);

authRouter.post(
  '/login',
  validateBody(validation.loginUserSchema),
  ctrlWrapper(controllers.loginController),
);

authRouter.post(
  '/send-reset-email',
  validateBody(validation.sendEmailSchema),
  ctrlWrapper(controllers.sendEmailController),
);

authRouter.post(
  '/reset-password',
  validateBody(validation.resetPasswordSchema),
  ctrlWrapper(controllers.resetPasswordController),
);

authRouter.post('/refresh', ctrlWrapper(controllers.refreshController));

authRouter.post('/logout', ctrlWrapper(controllers.logoutController));

export default authRouter;
