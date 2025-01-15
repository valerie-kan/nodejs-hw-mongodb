import { Router } from 'express';

import { validateBody } from '../utils/validateBody.js';

import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as controllers from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(controllers.registerController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(controllers.loginController),
);

authRouter.post('/refresh', ctrlWrapper(controllers.refreshController));

authRouter.post('/logout', ctrlWrapper(controllers.logoutController));

export default authRouter;
