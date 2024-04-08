import express from 'express';

import { itemsRouter } from '@/routes/items/items.router';

export const routerV1 = express.Router();

routerV1.use('/items', itemsRouter);
