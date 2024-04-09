import express from 'express';

import { cartRouter } from '@/routes/cart.routes';
import { itemRouter } from '@/routes/item.routes';

export const routerV1 = express.Router();

routerV1.use('/items', itemRouter);
routerV1.use('/cart', cartRouter);
