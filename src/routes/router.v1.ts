import express from 'express';

import { itemsRouter } from '@/routes/item.routes';

export const routerV1 = express.Router();

routerV1.use('/items', itemsRouter);
