import { NextFunction, Request, Response } from 'express';
import { request } from 'https';
import { CreateEventDto, UpdateEventDto } from '../dtos/events.dto';

import { Event } from '../interfaces/events.interface';
import EventService from '../services/events.service';
import {  RequestWithUser } from '../interfaces/auth.interface';
import { userEvent } from '../interfaces/userEvent.interface';
import { eventMessage } from '../interfaces/eventMessages.interface';

class EventsController {
    public eventService = new EventService();

    public getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const findAllEventsData: Event[] = await this.eventService.findAllEvents();
  
          res.status(200).json(findAllEventsData);
          console.log("findAll")
      } catch (error) {
        next(error);
      }
    };
  
    public getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const eventId = Number(req.params.id);
        const findOneEventData: Event = await this.eventService.findEventById(eventId);
          res.status(200).json(findOneEventData);
          console.log('findOne')
      } catch (error) {
        next(error);
      }
  };

  
    public createEvent = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
      try {
        const eventData: CreateEventDto = req.body;
        const userID = req.user.ID
        const createEventData: Event = await this.eventService.createEvent(userID,eventData);
        res.status(201).json(createEventData);
      } catch (error) {
        next(error);
      }
  };
  public joinEvent = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
       
      const userID = req.user.ID
      const eventID = Number(req.params.id)
      const joinEventData: userEvent = await this.eventService.joinEvent(userID,eventID);
      res.status(201).json(joinEventData);
    } catch (error) {
      next(error);
    }
  };
  
    public updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const eventId = Number(req.params.id);
        const eventData: Event = req.body;
        const updateEventData: UpdateEventDto = await this.eventService.updateEvent(eventId, eventData);
  
        res.status(200).json(updateEventData);
      } catch (error) {
        next(error);
      }
    };
  
    // public deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //   try {
    //     const eventId = Number(req.params.id);
    //     const deleteEventData: Event[] = await this.eventService.deleteEvent(eventId);
  
    //     res.status(200).json({ data: deleteEventData, message: 'deleted' });
    //   } catch (error) {
    //     next(error);
    //   }
    // };
  public getAllEventMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventId = Number(req.params.id);
      
      const eventMessages: eventMessage[] = await this.eventService.loadAllEventMessages(eventId);

      res.status(200).json(eventMessages);
    } catch (error) {
      next(error);
    }
  }
  
  }
  
  export default EventsController;