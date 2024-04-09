import { cart } from '@/data/cart';
import { Cart, ICartItem } from '@/models/cart.model';
import { Item } from '@/models/item.model';
import { User } from '@/models/user.model';

export class CartRepository {
  private cart: Cart[];

  constructor() {
    this.cart = cart;
  }

  getCartByUserId(userId: User['userId']): Cart {
    let userCart = this.cart.find((cart) => cart.userId === userId);
    if (!userCart) {
      userCart = new Cart(userId);
      this.cart.push(userCart);
    }
    return userCart;
  }

  addItemToCart(userId: User['userId'], cartItem: ICartItem): void {
    const cart = this.getCartByUserId(userId);
    const existingItemIndex = cart.items.findIndex((item) => item.itemId === cartItem.itemId);
    if (existingItemIndex !== -1) {
      throw new Error('Item already exists in cart');
    } else {
      cart.items.push(cartItem);
    }
  }

  updateItemQuantity(userId: User['userId'], itemId: Item['itemId'], quantity: ICartItem['quantity']): void {
    const cart = this.getCartByUserId(userId);
    const itemIndex = cart.items.findIndex((item) => item.itemId === itemId);
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }
    cart.items[itemIndex]!.quantity = quantity;
  }

  removeItemFromCart(userId: User['userId'], itemId: Item['itemId']): void {
    const cart = this.getCartByUserId(userId);
    const itemIndex = cart.items.findIndex((item) => item.itemId === itemId);
    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
    } else {
      throw new Error('Item not found in cart');
    }
  }
}
