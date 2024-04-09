import { Cart } from '@/models/cart.model';

/**
 * Sample cart data.
 */
export const carts: Cart[] = [
  {
    cartId: '4affbae3-ccb4-4b63-a8e4-825a240d4cb6',
    userId: 'abe4297d-4594-43d0-8791-91d735189ec9',
    totalPriceInCent: 6999 + 11299 * 2,
    items: [
      {
        itemId: 'b4af6c60-2d89-478a-8ec7-42e88ebd3e7a',
        name: 'ABERFELDY - 12 YEAR OLD',
        priceInCent: 6999,
        category: 'scotch',
        rating: 3.9,
        imgPath: '/scotch/aberfeldy.png',
        quantity: 1,
      },
      {
        itemId: '37f05c55-e277-41f6-b255-9ec403e9f428',
        name: 'ARDBEG - 10 YEAR OLD',
        priceInCent: 11299,
        category: 'scotch',
        rating: 4.3,
        imgPath: '/scotch/ardbeg.png',
        quantity: 2,
      },
    ],
  },
];
