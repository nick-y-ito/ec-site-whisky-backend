/**
 * Route handlers that receive HTTP requests and return responses
 */
import { Request, Response } from 'express';

import { isValidUuidV4 } from '@/lib/utils';
import { Item } from '@/models/item.model';
import { ItemService } from '@/services/item.service';
import { isTCategory } from '@/types/item.types';

export class ItemController {
  constructor(private itemService: ItemService) {}

  /**
   * GET /items
   */
  async getAllItems(_: Request, res: Response) {
    try {
      const items = await this.itemService.getAllItems();
      return res.status(200).json(items);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * GET /items/:itemId
   */
  async getItem(req: Request, res: Response) {
    try {
      const itemId = req.params['itemId'];

      /* Input validation */
      if (!itemId) {
        return res.status(400).json({ message: 'Missing itemId' });
      }
      if (!isValidUuidV4(itemId)) {
        return res.status(400).json({ message: 'Invalid itemId' });
      }
      const item = await this.itemService.getItem(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      return res.status(200).json(item);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * POST /items
   */
  async createItem(req: Request, res: Response) {
    try {
      const { name, priceInCent, category, rating, imgPath, description } = req.body as Omit<Item, 'itemId'>;

      /* Input validation */
      if (!name) {
        return res.status(400).json({ message: 'Missing name' });
      }
      if (!priceInCent) {
        return res.status(400).json({ message: 'Missing price' });
      }
      if (category && !isTCategory(category)) {
        return res.status(400).json({ message: 'Invalid category' });
      }

      const itemCreate: Omit<Item, 'itemId'> = { name, priceInCent, category, rating, imgPath, description };

      const createdItem = await this.itemService.createItem(itemCreate);
      return res.status(201).json(createdItem);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * PUT /items/:itemId
   */
  async updateItem(req: Request, res: Response) {
    try {
      const itemId = req.params['itemId'];
      const { name, priceInCent, category, rating, imgPath, description } = req.body as Omit<Item, 'itemId'>;

      /* Input validation */
      if (!itemId) {
        return res.status(400).json({ message: 'Missing itemId' });
      }
      if (!isValidUuidV4(itemId)) {
        return res.status(400).json({ message: 'Invalid itemId' });
      }
      if (!name) {
        return res.status(400).json({ message: 'Missing name' });
      }
      if (!priceInCent) {
        return res.status(400).json({ message: 'Missing price' });
      }
      if (category && !isTCategory(category)) {
        return res.status(400).json({ message: 'Invalid category' });
      }

      const itemUpdate: Omit<Item, 'itemId'> = { name, priceInCent, category, rating, imgPath, description };

      const updatedItem = await this.itemService.updateItem(itemId as Item['itemId'], itemUpdate);
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      return res.status(200).json(updatedItem);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * DELETE /items
   */
  async deleteItem(req: Request, res: Response) {
    try {
      const itemId = req.params['itemId'];

      /* Input validation */
      if (!itemId) {
        return res.status(400).json({ message: 'Missing itemId' });
      }
      if (!isValidUuidV4(itemId)) {
        return res.status(400).json({ message: 'Invalid itemId' });
      }

      const result = await this.itemService.deleteItem(itemId);
      if (!result) {
        return res.status(404).json({ message: 'Item not found' });
      }
      return res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
