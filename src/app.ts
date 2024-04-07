import cors from 'cors';
import express from 'express';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello World!');
});
