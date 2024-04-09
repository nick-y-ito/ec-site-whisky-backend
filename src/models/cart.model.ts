import { v4 as uuidv4 } from 'uuid';

import { Item } from '@/models/item.model';
import { User } from '@/models/user.model';

export interface ICartItem extends Item {
  quantity: number;
}

export class Cart {
  public cartId: string; // UUID v4
  public userId: User['userId'];
  public items: ICartItem[];

  constructor(userId: User['userId']) {
    this.cartId = uuidv4();
    this.userId = userId;
    this.items = [];
  }
}
