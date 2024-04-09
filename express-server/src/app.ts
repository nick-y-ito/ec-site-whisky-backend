import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import { routerV1 } from '@/routes/router.v1';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(morgan('combined'));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/v1', routerV1);

app.get('/*', (_, res) => {
  res.status(404).json({ message: 'Not found' });
});
