import { Cart, ICartItem } from '@/models/cart.model';
import { Item } from '@/models/item.model';
import { User } from '@/models/user.model';
import { CartRepository } from '@/repositories/cart.repository';
import { ItemRepository } from '@/repositories/item.repository';

export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private ItemRepository: ItemRepository,
  ) {}

  /**
   * Get a user's cart
   *
   * @param userId The user's ID
   * @returns The user's cart
   */
  async getCartByUserId(userId: User['userId']): Promise<Cart> {
    return this.cartRepository.getCartByUserId(userId);
  }

  /**
   * Add an item to a user's cart
   *
   * @param userId The user's ID
   * @param itemId The item's ID
   */
  async addItemToCart(
    userId: User['userId'],
    itemId: Item['itemId'],
    quantity: ICartItem['quantity'] = 1,
  ): Promise<void> {
    const item = await this.ItemRepository.findById(itemId);
    if (!item) {
      throw new Error('Item not found');
    }
    const cartItem: ICartItem = Object.assign(item, { quantity });
    this.cartRepository.addItemToCart(userId, cartItem);
  }

  /**
   * Update the quantity of an item in a user's cart
   *
   * @param userId The user's ID
   * @param itemId The item's ID
   * @param quantity The new quantity
   */
  async updateItemQuantity(
    userId: User['userId'],
    itemId: Item['itemId'],
    quantity: ICartItem['quantity'],
  ): Promise<void> {
    this.cartRepository.updateItemQuantity(userId, itemId, quantity);
  }

  async removeItemFromCart(userId: User['userId'], itemId: Item['itemId']): Promise<void> {
    this.cartRepository.removeItemFromCart(userId, itemId);
  }
}
