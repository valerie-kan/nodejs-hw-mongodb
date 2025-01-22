import multer from 'multer';
import createError from 'http-errors';

import { UPLOADS_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random())}`;
    cb(null, `${uniquePreffix}_${file.originalname}`);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split('.').pop();
  if (extention === 'exe') {
    return cb(createError(400, 'File with .exe extention is not allowed'));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits,
  fileFilter,
});
