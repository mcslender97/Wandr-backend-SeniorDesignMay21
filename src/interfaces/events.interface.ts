import { plainToClassFromExist } from 'class-transformer';
import { Place } from './places.interface';
export interface Event {
  id: number;
  title: string;
  createdAt: string; //timestamp
  eventTime: string; // type of date in SQL
  //FK? for Place
  place: Place;
}
