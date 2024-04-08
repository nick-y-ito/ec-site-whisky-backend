import express from 'express';

import {
  createItemHandler,
  deleteItemHandler,
  getItemHandler,
  getItemsHandler,
  updateItemHandler,
} from '@/routes/items/items.controller';

export const itemsRouter = express.Router();

itemsRouter.get('/', getItemsHandler);
itemsRouter.post('/', createItemHandler);
itemsRouter.get('/:itemId', getItemHandler);
itemsRouter.put('/:itemId', updateItemHandler);
itemsRouter.delete('/:itemId', deleteItemHandler);
