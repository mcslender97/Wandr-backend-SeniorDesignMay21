import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';

import DatabaseService from '../services/database.service'

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const db = new DatabaseService()
  try {
    const headers = req.headers;
    if (headers && headers.authorization && headers.authorization.startsWith("Bearer ")) {
      const secret = process.env.JWT_SECRET;
      const verificationResponse = (await jwt.verify(headers.authorization.replace(/Bearer /, "") as string, secret)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await db.findUserByID(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
