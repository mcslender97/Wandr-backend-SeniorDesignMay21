import bcrypt from 'bcrypt';
import { CreateEventDto, UpdateEventDto } from '../dtos/events.dto';
//import { CreateEventDto } from '../dtos/events.dto';
import HttpException from '../exceptions/HttpException';
import { Event } from '../interfaces/events.interface';
import { userEvent } from '../interfaces/userEvent.interface';

import { isEmpty } from '../utils/util';
import DatabaseService from './database.service';


class EventService {
  // public events = eventModel;
  public events;
  private date = new Date()
  private db = new DatabaseService();
  constructor() {
    this.events = this.db.getAllEvents();
  }

  public async findAllEvents(): Promise<Event[]> {
    //   const events: Event[] = this.events;
    const events = await this.db.getAllEvents();
    return events;
  }
  

  public async findEventById(eventID: number): Promise<Event> {
    // const findEvent: Event = this.events.find(event => event.id === eventId);
    const event = await this.db.findEventByID(eventID);
    // if (!findEvent) throw new HttpException(409, "You're not event");

    return event;
  }

  public async createEvent(userID: number, eventData: CreateEventDto): Promise<Event> {
    if (isEmpty(eventData)) throw new HttpException(400, "You're not eventData");  
    // const findEvent = await this.db.findEventByID(eventData.EventId); check if event is duplicate?
    // if (!(findEvent === null)) throw new HttpException(409, `You're Event already exists`);
    
    const createEventData: Event = {
      EventId: this.events.length + 1,
      ...eventData,
      CreatedAt: this.date.toISOString(),
      UserID: userID
  
    };

    return createEventData;
  }

  public async updateEvent(eventId: number, eventData: Event): Promise<UpdateEventDto> {
    if (isEmpty(eventData)) throw new HttpException(400, "You're not eventData");

    
    const findEvent: Event = await this.db.findEventByID(eventId);
    if (!findEvent) throw new HttpException(409, "You're not event");
    const updateEventData: UpdateEventDto = await this.db.updateEvent(eventId,eventData);

    return updateEventData;
  }

  public async deleteEvent(EventId: number): Promise<boolean> {
    const findEvent: Event = await this.db.findEventByID(EventId);
    if (!findEvent) throw new HttpException(409, "You're not event");

    const deleteEventData: number = await this.db.deleteEventByID(EventId)
    if (deleteEventData === 0) {
      return false
    }
    return true;
  }
  public async joinEvent(UserID: number, EventId: number): Promise<userEvent>{
    const findEvent: Event = await this.db.findEventByID(EventId);
    if (!findEvent) throw new HttpException(409, "You're not event");
    const userEvent = await this.db.createUser_Event(UserID, EventId, this.date.toISOString())
    return userEvent;
  }
}

export default EventService;
