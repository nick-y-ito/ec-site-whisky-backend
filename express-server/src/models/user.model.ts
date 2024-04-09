import { UUIDv4 } from '@/types/general.types';

export class User {
  userId: UUIDv4;

  constructor(userId: User['userId']) {
    this.userId = userId;
  }
}
