import { NextFunction, Request, Response } from 'express';
import { Query } from 'mysql';
//import { CreatePlaceDto } from '../dtos/places.dto';
import { Event } from '../interfaces/events.interface';

import { Place } from '../interfaces/places.interface';
import PlaceService from '../services/places.service';

class PlacesController {
    public placeService = new PlaceService();

    public getPlaces = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const findAllPlacesData: Place[] = await this.placeService.findAllPlaces();
          res.status(200).json(findAllPlacesData);
          console.log("findAll")
      } catch (error) {
        next(error);
      }
  };
  public getPlacesBySearchQuery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {// search?q=<search query goes here>
    try {
      let q = req.query.q;
      const findAllPlacesData: Place[] = await this.placeService.showPlacesBySearchQuery(q.toString());

        res.status(200).json(findAllPlacesData);
        console.log("findBySearchQuery")
    } catch (error) {
      next(error);
    }
  };
  
    public getPlaceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const placeId = Number(req.params.id);
        const findOnePlaceData: Place = await this.placeService.findPlaceById(placeId);
  
          res.status(200).json(findOnePlaceData);
          console.log('findOne')
      } catch (error) {
        next(error);
      }
    };
    public getEventsOfAPlace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const pid = Number(req.params.id);
        const findAllEventsData: Event[] = await this.placeService.showEventsInAPlace(pid);
          res.status(200).json(findAllEventsData);
          console.log("findFromPlace")
      } catch (error) {
        next(error);
      }
  };
  public getEventsOfAPlaceInADate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {//?date=YYYY-MM-DD
    try {
      const pid = Number(req.params.id);
      let date = req.query.date.toString();

      const findAllEventsData: Event[] = await this.placeService.showEventsInAPlaceAtADate(pid, date);
        res.status(200).json(findAllEventsData);
        console.log("findFromPlace")
    } catch (error) {
      next(error);
    }
  };
    // public createPlace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //   try {
    //     const placeData: CreatePlaceDto = req.body;
    //     const createPlaceData: Place = await this.placeService.createPlace(placeData);
  
    //     res.status(201).json({ data: createPlaceData, message: 'created' });
    //   } catch (error) {
    //     next(error);
    //   }
    // };
  
    // public updatePlace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //   try {
    //     const placeId = Number(req.params.id);
    //     const placeData: Place = req.body;
    //     const updatePlaceData: Place[] = await this.placeService.updatePlace(placeId, placeData);
  
    //     res.status(200).json({ data: updatePlaceData, message: 'updated' });
    //   } catch (error) {
    //     next(error);
    //   }
    // };
  
    // public deletePlace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //   try {
    //     const placeId = Number(req.params.id);
    //     const deletePlaceData: Place[] = await this.placeService.deletePlace(placeId);
  
    //     res.status(200).json({ data: deletePlaceData, message: 'deleted' });
    //   } catch (error) {
    //     next(error);
    //   }
    // };
  }
  
  export default PlacesController;