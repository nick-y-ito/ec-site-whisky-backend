import cors from 'cors';
import express from 'express';

import { routerV1 } from '@/routes/router.v1';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(express.json());

app.use('/v1', routerV1);

app.get('/*', (_, res) => {
  res.status(404).json({ message: 'Not found' });
});
