import mysql from 'mysql';
import config from '../config/config';

import Knex from 'knex';
import { User } from '../interfaces/users.interface';
import { Place } from '../interfaces/places.interface';
import { Event } from '../interfaces/events.interface';
import UsersController from '../controllers/users.controller';
import { LoginUserDto, UserDto } from '../dtos/users.dto';
import { CreateEventDto, UpdateEventDto } from '../dtos/events.dto';
import { userEvent } from '../interfaces/userEvent.interface';
import { City } from '../interfaces/cities.interfaces';

const knex = Knex({
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  },
});

class DatabaseService {
  async findUserByID(id: number) {
    return await knex<User>('user').where('id', id).first();
  }
  async findUserByEmail(email: string) {
    return await knex<User>('user').where('Email', email).first();
  }
  
  // async findEventByPlace(place: Place){
  //     //return await knex<
  //     return await knex<Event>('event').where("place", place );
  // }
  async getAllUser() {
    return await knex<User>('user');
  }
  async deleteUserByID(id: number) {
    await knex<User>('user').where('id', id).del();
  }
  async updateUserByID(id: number, userData: User): Promise<User> {
    return await knex<User>('user').where('id', id).update(
      {
        Fullname: userData.Fullname,
        Dob: userData.Dob,
        Email: userData.Email,
        Gender: userData.Gender,
        Password: userData.Password,
        Phone: userData.Phone,
        Username: userData.Username
      },
      [ 'Fullname', 'Dob', 'Email', 'Gender', 'Password', 'Phone','Username'],
    );
  }
  async createUser(userData: User): Promise<UserDto> {
    return await knex<User>('user').insert(
      {
        Fullname: userData.Fullname,
        Dob: userData.Dob,
        Email: userData.Email,
        Gender: userData.Gender,
        Password: userData.Password,
        Phone: userData.Phone,
        Username: userData.Username
        
      },
      ['Fullname', 'Dob', 'Email', 'Gender', 'Phone','User'],
    );
  }

// function for search data from 2 tables to get events in 1 place: use inner join query
  async getAllEvents() {
    return await knex<Event>('event');
  }
  async findEventByID(id: number) {
    return await knex('event').where('EventId', id).first();
  }
  async findEventByPlace(placeName: string) {
    return await knex<Event>('event').where('place', placeName).first();
  }
  async updateEvent(eventID: number, eventData: Event): Promise<UpdateEventDto> {
    return await knex<Event>('event').where('EventId', eventID).update(
      {
        EventId: eventData.EventId,
        Title: eventData.Title,
        EventStartTime: eventData.EventStartTime,
        EventEndTime: eventData.EventEndTime,
      }, 
    );

  }
  async deleteEventByID(eventID: number){
    return await knex<Event>('event').where('EventId', eventID).del();
  }
  async createEvent(eventData: Event): Promise<CreateEventDto> {
    return await knex<Event>('event').insert({
      EventId: eventData.EventId,
      Title: eventData.Title,
      CreatedAt: eventData.CreatedAt,
      EventStartTime: eventData.EventStartTime,
      EventEndTime: eventData.EventEndTime,
      PlaceID: eventData.PlaceID,
      UserID: eventData.UserID
    })
  }
  async getAllPlaces() {
    return await knex<Place>('place');
  }
  async findPlaceByID(id: number) {
    return await knex('place').where('PlaceID', id).first();
  }
  async showPlaceByCityID(cityid: number) {
    return await knex<Place>('place').select('*').innerJoin<City>('city', 'place.CityID', 'city.CityID').where('place.CityID', cityid);
  }
  async findPlaceByLocation(location: string) {
    return await knex<Place>('place').where('location', location);
  }
  async showPlaceByLocationSearchQuery(query: string) {
    return await knex<Place>('place').where('location', "like", "%"+query+"%");
  }
  async showCitiesBySearchQuery(query: string) {
    return await knex<City>('city').where('name', "like", "%"+query+"%");
  }
  async showEventByPlace(pid: number) {
    return await knex<Event>('event').select('*').innerJoin<Place>('place', 'event.PlaceID', 'place.PlaceID').where('event.PlaceId', pid);
    // return await knex<Event>('event').select('*').innerJoin('place', 'event.PlaceID', 'place.PlaceID').where('event.PlaceID', pid);
    //return await knex.raw('SELECT * FROM event INNER JOIN place on event.PlaceID = place.PlaceID where event.PlaceID = ?', pid);
  }
  async getNumberOfUsers(): Promise<number> {
    return await knex<User>('user').count({ id: 'ID' })
  }
  // async getEventsOfADay(): Promise<Event[]{
  //   return await knex<Event>('event').where
  // }
  async createUser_Event(userid: number, eventid: number, timestamp: string): Promise<userEvent> {
    return await knex('user_event').insert({
      EventId: eventid,
      UserID: userid,
      JoinedAt: timestamp
    })
  }
}

export default DatabaseService;
