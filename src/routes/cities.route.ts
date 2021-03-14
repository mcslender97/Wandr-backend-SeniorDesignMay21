import { Router } from 'express';
import PlacesController from '../controllers/places.controller';
//import { CreatePlaceDto } from '../dtos/places.dto';
import { City } from '../interfaces/cities.interfaces';
import authMiddleware from '../middlewares/auth.middleware';
import CitiesController from '../controllers/cities.controller';
import Route from '../interfaces/routes.interface';


class CitiesRoute implements Route {
  public path = '/cities';
  public router = Router();
  public citiesController = new CitiesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(`${this.path}`, authMiddleware);

    this.router.get(`${this.path}`, this.citiesController.getCitiesBySearchQuery);
    // this.router.get(`${this.path}/:id(\\d+)`, this.placesController.getPlaceById);
    // this.router.get(`${this.path}/search`, this.placesController.getPlacesBySearchQuery); //search places route
    // this.router.get(`${this.path}/:id(\\d+)/events`, this.placesController.getEventsOfAPlace);
    

//     this.router.post(`${this.path}`, validationMiddleware(CreatePlaceDto, 'body'), this.placesController.createPlace);
//     this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreatePlaceDto, 'body', true), this.placesController.updatePlace);
//     this.router.delete(`${this.path}/:id(\\d+)`, this.placesController.deletePlace);
    }
}

export default CitiesRoute;