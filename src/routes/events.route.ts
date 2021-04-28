import { Router } from 'express';
import EventsController from '../controllers/events.controller';
import { CreateEventDto, CreateUserEventDto, UpdateEventDto } from '../dtos/events.dto';
//import { CreateEventDto } from '../dtos/events.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class EventsRoute implements Route {
  public path = '/events';
  public router = Router();
  public eventsController = new EventsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(`${this.path}`, authMiddleware);

    this.router.get(`${this.path}`, this.eventsController.getEvents);
    this.router.get(`${this.path}/:id(\\d+)`, this.eventsController.getEventById);
    this.router.get(`${this.path}/:id(\\d+)/messagees`, this.eventsController.getAllEventMessages);
    this.router.post(`${this.path}`, validationMiddleware(CreateEventDto, 'body'), this.eventsController.createEvent);
    this.router.post(`${this.path}/:id(\\d+)/join`, validationMiddleware(CreateUserEventDto, 'body'), this.eventsController.joinEvent);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(UpdateEventDto, 'body', true), this.eventsController.updateEvent);
//     this.router.delete(`${this.path}/:id(\\d+)`, this.eventsController.deleteEvent);
    }
}

export default EventsRoute;
