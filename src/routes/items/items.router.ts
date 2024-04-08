import express from 'express';

import { ItemsController } from '@/routes/items/items.controller';

export const itemsRouter = express.Router();

const itemsController = new ItemsController();

itemsRouter.get('/', itemsController.getItems);
itemsRouter.post('/', itemsController.createItem);
itemsRouter.get('/:itemId', itemsController.getItem);
itemsRouter.put('/:itemId', itemsController.updateItem);
itemsRouter.delete('/:itemId', itemsController.deleteItem);
