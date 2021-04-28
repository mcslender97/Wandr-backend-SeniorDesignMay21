import { Router } from 'express';

import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import ChatController from '../controllers/chat.controller'
class ChatRoute implements Route {
  public path = '/chat';
  public router = Router();

  public chatController = new ChatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(`${this.path}`, authMiddleware);

    // this.router.get(`${this.path}`, this.usersController.getUsers);
     this.router.get(`${this.path}/:eventid(\\d+)`, this.chatController.getAllMessagesInAnEvent);
    // this.router.get(`${this.path}/joinedEvents`, this.usersController.getEventsJoinedByUser);
    // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default ChatRoute;