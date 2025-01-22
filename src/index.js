import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { UPLOADS_DIR } from './constants/index.js';

const bootstrap = async () => {
  await createDirIfNotExists(UPLOADS_DIR);
  await initMongoConnection();
  setupServer();
};

bootstrap();
