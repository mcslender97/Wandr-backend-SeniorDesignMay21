import { plainToClassFromExist } from 'class-transformer';
import { Place } from './places.interface';
export interface Event {
  EventId: number;
  Title: string;
  CreatedAt: string; //timestamp
  EventStartTime: string; // type of date in SQL
  EventEndTime: string;
  PlaceID: number;//FK? for Place
  UserID: number;
}
