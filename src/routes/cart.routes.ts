import express from 'express';

import { CartController } from '@/controllers/cart.controller';
import { authenticate } from '@/middleware/authenticate';
import { CartRepository } from '@/repositories/cart.repository';
import { ItemRepository } from '@/repositories/item.repository';
import { CartService } from '@/services/cart.service';

export const cartRouter = express.Router();

/* Dependency injection */
const itemRepository = new ItemRepository();
const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository, itemRepository);
const cartController = new CartController(cartService);

cartRouter.use(authenticate);

cartRouter.get('/', cartController.getCart.bind(cartController));
cartRouter.post('/', cartController.addItem.bind(cartController));
cartRouter.patch('/:itemId', cartController.updateItemQuantity.bind(cartController));
cartRouter.delete('/:itemId', cartController.removeItem.bind(cartController));
