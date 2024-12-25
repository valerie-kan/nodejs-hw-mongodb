import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import * as contactServices from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const data = await contactServices.getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const data = await contactServices.getContactById(contactId);

    if (!data)
      return res.status(404).json({
        status: 404,
        message: `Contact not found`,
      });

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Server error occured',
      error: err.message,
    });
  });

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(3000, () => console.log(`Server is running on port ${port}`));
};
