export class User {
  userId: string; // UUID v4

  constructor(userId: User['userId']) {
    this.userId = userId;
  }
}
