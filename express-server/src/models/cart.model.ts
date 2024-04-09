import { v4 as uuidv4 } from 'uuid';

import { Item } from '@/models/item.model';
import { User } from '@/models/user.model';
import { UUIDv4 } from '@/types/general.types';

export interface ICartItem extends Item {
  quantity: number;
}

export class Cart {
  public cartId: UUIDv4;
  public userId: User['userId'];
  public totalPriceInCent: Item['priceInCent'];
  public items: ICartItem[];

  constructor(userId: User['userId']) {
    this.cartId = uuidv4();
    this.userId = userId;
    this.totalPriceInCent = 0;
    this.items = [];
  }
}
