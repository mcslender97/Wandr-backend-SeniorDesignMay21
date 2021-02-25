import bcrypt from 'bcrypt';
//import { CreateEventDto } from '../dtos/events.dto';
import HttpException from '../exceptions/HttpException';
import { Event } from '../interfaces/events.interface';
//import eventModel from '../models/events.model';
import { isEmpty } from '../utils/util';
import DatabaseService from './database.service';

class EventService {
  // public events = eventModel;
  public events;
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
  public async showEventsInAPlace(pid: number): Promise<Event[]> {
    //   const events: Event[] = this.events;
    const events = await this.db.showEventByPlace(pid);
    return events;
  }

//   public async createEvent(eventData: CreateEventDto): Promise<Event> {
//     if (isEmpty(eventData)) throw new HttpException(400, "You're not eventData");  
//     const findEvent = await this.db.findEventByEmail(eventData.email);
//     if (!(findEvent === null)) throw new HttpException(409, `You're email ${eventData.email} already exists`);
//     const hashedPassword = await bcrypt.hash(eventData.password, 10);
//     const createEventData: Event = {
//       id: this.events.length + 1,
//       ...eventData,
//       password: hashedPassword,
//       dob: null,
//       fullname: '',
//       gender: '',
//       phone: null,
//       email: '',
//     };

//     return createEventData;
//   }

//   public async updateEvent(eventId: number, eventData: Event): Promise<Event[]> {
//     if (isEmpty(eventData)) throw new HttpException(400, "You're not eventData");

    
//     const findEvent: Event = await this.db.findEventByID(eventId);
//     if (!findEvent) throw new HttpException(409, "You're not event");

//     const hashedPassword = await bcrypt.hash(eventData.password, 10);

//     const updateEventData: Event[] = await this.db.updateEventByID(eventId, eventData);

//     return updateEventData;
//   }

//   public async deleteEvent(eventId: number): Promise<Event[]> {
//     const findEvent: Event = this.events.find(event => event.id === eventId);
//     if (!findEvent) throw new HttpException(409, "You're not event");

//     const deleteEventData: Event[] = this.events.filter((event: { id: number }) => event.id !== findEvent.id);
//     return deleteEventData;
//   }
 }

export default EventService;
