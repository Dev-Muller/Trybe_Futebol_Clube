import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/jwt';

export default class UserAuth {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const newToken = token.includes('Bearer') ? token.replace('Bearer', '') : token;
      // console.log('****', newToken.length);
      // console.log('------', newToken.trim().length);

      const verify = JWT.verifyToken(newToken.trim());
      req.body.user = verify;
      next();
    } catch (err) {
      // console.log(err);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
