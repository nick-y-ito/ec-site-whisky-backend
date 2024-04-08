import express from 'express';

import { ItemController } from '@/controllers/item.controller';
import { ItemRepository } from '@/repositories/item.repository';
import { ItemService } from '@/services/item.service';

export const itemRouter = express.Router();

// Dependency injection
const itemController = new ItemController(new ItemService(new ItemRepository()));

itemRouter.get('/', itemController.getAllItems.bind(itemController));
itemRouter.get('/:itemId', itemController.getItem.bind(itemController));
itemRouter.post('/', itemController.createItem.bind(itemController));
itemRouter.put('/:itemId', itemController.updateItem.bind(itemController));
itemRouter.delete('/:itemId', itemController.deleteItem.bind(itemController));
