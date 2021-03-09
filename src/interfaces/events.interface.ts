import { plainToClassFromExist } from 'class-transformer';
import { Place } from './places.interface';
export interface Event {
  EventId: number;
  Title: string;
  CreatedAt: string; //timestamp
  EventTime: string; // type of date in SQL
  
  PlaceID: number;//FK? for Place
  UserID: number;
}
