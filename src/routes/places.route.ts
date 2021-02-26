import { Router } from 'express';
import PlacesController from '../controllers/places.controller';
//import { CreatePlaceDto } from '../dtos/places.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class PlacesRoute implements Route {
  public path = '/places';
  public router = Router();
  public placesController = new PlacesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.placesController.getPlaces);
    this.router.get(`${this.path}/:id(\\d+)`, this.placesController.getPlaceById);
    this.router.get(`${this.path}/search`, this.placesController.getPlacesBySearchQuery); //search places route
    this.router.get(`${this.path}/:id(\\d+)/events`, this.placesController.getEventsOfAPlace);

//     this.router.post(`${this.path}`, validationMiddleware(CreatePlaceDto, 'body'), this.placesController.createPlace);
//     this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreatePlaceDto, 'body', true), this.placesController.updatePlace);
//     this.router.delete(`${this.path}/:id(\\d+)`, this.placesController.deletePlace);
    }
}

export default PlacesRoute;
