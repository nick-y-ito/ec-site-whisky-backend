import express from 'express';

import { itemRouter } from '@/routes/item.routes';

export const routerV1 = express.Router();

routerV1.use('/items', itemRouter);
