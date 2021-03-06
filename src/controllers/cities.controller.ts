import { NextFunction, Request, Response } from 'express';
import { Query } from 'mysql';
//import { CreatePlaceDto } from '../dtos/places.dto';
import { Event } from '../interfaces/events.interface';

import { City } from '../interfaces/cities.interfaces';
import CitiesService from '../services/cities.service';
import { Place } from '../interfaces/places.interface';

class CitiesController
{
    public citiesService = new CitiesService()
    public getCitiesBySearchQuery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {// search?q=<search query goes here>
        try {
          let q = req.query.q;
          const findAllPlacesData: City[] = await this.citiesService.showCitiesBySearchQuery(q.toString());
    
            res.status(200).json(findAllPlacesData);
            console.log("findBySearchQuery")
        } catch (error) {
          next(error);
        }
  };
  public getPlacesOfACity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cityid = Number(req.params.id);
      const placesData: Place[] = await this.citiesService.showPlacesInACity(cityid);
        res.status(200).json(placesData);
        console.log("findFromPlace")
    } catch (error) {
      next(error);
    }
  };
}
export default CitiesController