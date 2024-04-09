import { NextFunction, Request, Response } from 'express';

import { users } from '@/data/users';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-userid'];

  if (!userId) {
    return res.status(401).send('Authentication header missing');
  }

  const user = users.find((user) => user.userId === userId);

  if (!user) {
    return res.status(401).send('User not found');
  }

  // Attaching user to the request object so it can be used in subsequent handlers
  req.user = user;

  return next();
};
