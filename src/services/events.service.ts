import bcrypt from 'bcrypt';
import { CreateEventDto, GenerateEventDto, UpdateEventDto } from '../dtos/events.dto';
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
    
    const createEventData: GenerateEventDto = {
      
      ...eventData,
      CreatedAt: this.date.toJSON().slice(0, 19).replace('T', ' '),
      UserID: userID
  
    };
    const createEvent = await this.db.createEvent(createEventData);
    console.log(createEvent)
    return this.db.findEventByID(createEvent[0]);
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
    //todo: check for duplicate event

    if (!findEvent) throw new HttpException(409, "You're not event");
    const findUserEvent: userEvent = await this.db.getUser_EventWithUserIDAndEventID(UserID, EventId);
    if (findUserEvent) throw new HttpException(409, `You already joined the event`);

    const userEvent = await this.db.createUser_Event(UserID, EventId, this.date.toJSON().slice(0, 19).replace('T', ' '))
    return this.db.getUser_EventByID(userEvent[0]);
  }
  // public async leaveEvent(UserID: number, EventId: number): Promise<userEvent>{
  //   const findEvent: Event = await this.db.findEventByID(EventId);
  //   if (!findEvent) throw new HttpException(409, "You're not event");
  //   const userEvent = await this.db.createUser_Event(UserID, EventId, this.date.toJSON().slice(0, 19).replace('T', ' '))
  //   return userEvent;
  // }
}

export default EventService;
