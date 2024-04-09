import { Request, Response } from 'express';

import { isValidUuidV4 } from '@/lib/utils';
import { CartService } from '@/services/cart.service';

export class CartController {
  private cartService: CartService;

  constructor(CartService: CartService) {
    this.cartService = CartService;
  }

  /**
   * GET /cart
   */
  async getCart(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;

      /* Input validation */
      if (!userId) {
        return res.status(400).json({ message: 'Missing userId' });
      }
      if (!isValidUuidV4(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }

      const cart = await this.cartService.getCartByUserId(userId);
      return res.json(cart);
    } catch (err) {
      let message = 'Internal server error';
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).json({ message });
    }
  }

  /**
   * POST /cart
   */
  async addItem(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const itemId = req.body.itemId;
      const quantity = req.body.quantity;

      /* Input validation */
      if (!userId) {
        return res.status(400).json({ message: 'Missing userId' });
      }
      if (!isValidUuidV4(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }
      if (!itemId) {
        return res.status(400).json({ message: 'Missing itemId' });
      }
      if (typeof itemId !== 'string' || !isValidUuidV4(itemId)) {
        return res.status(400).json({ message: 'Invalid itemId' });
      }
      if (
        (typeof quantity !== 'undefined' && typeof quantity !== 'number') ||
        (typeof quantity === 'number' && (quantity < 1 || quantity % 1 !== 0))
      ) {
        return res.status(400).json({ message: 'Invalid quantity' });
      }

      const cart = await this.cartService.addItemToCart(userId, itemId, quantity);
      return res.json(cart);
    } catch (err) {
      let message = 'Internal server error';
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).json({ message });
    }
  }

  /**
   * PUT /cart/:itemId
   */
  async updateItemQuantity(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const itemId = req.params['itemId'];
      const quantity = Number(req.body.quantity);

      /* Input validation */
      if (!userId) {
        return res.status(400).json({ message: 'Missing userId' });
      }
      if (!isValidUuidV4(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }
      if (!itemId) {
        return res.status(400).json({ message: 'Missing itemId' });
      }
      if (!isValidUuidV4(itemId)) {
        return res.status(400).json({ message: 'Invalid itemId' });
      }
      if (!quantity && quantity !== 0) {
        return res.status(400).json({ message: 'Missing quantity' });
      }
      if (isNaN(quantity) || quantity < 0 || quantity % 1 !== 0) {
        return res.status(400).json({ message: 'Invalid quantity' });
      }

      const cart = await this.cartService.updateItemQuantity(userId, itemId, quantity);
      return res.json(cart);
    } catch (err) {
      let message = 'Internal server error';
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).json({ message });
    }
  }

  /**
   * DELETE /cart/:itemId
   */
  async removeItem(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const itemId = req.params['itemId'];

      /* Input validation */
      if (!userId) {
        return res.status(400).json({ message: 'Missing userId' });
      }
      if (!isValidUuidV4(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }
      if (!itemId) {
        return res.status(400).json({ message: 'Missing itemId' });
      }
      if (!isValidUuidV4(itemId)) {
        return res.status(400).json({ message: 'Invalid itemId' });
      }

      const cart = await this.cartService.removeItemFromCart(userId, itemId);
      return res.json(cart);
    } catch (err) {
      let message = 'Internal server error';
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).json({ message });
    }
  }
}
