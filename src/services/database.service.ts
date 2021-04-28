import mysql from 'mysql';
import config from '../config/config';

import Knex from 'knex';
import { User } from '../interfaces/users.interface';
import { Place } from '../interfaces/places.interface';
import { Event } from '../interfaces/events.interface';
import UsersController from '../controllers/users.controller';
import { CreateUserDto, LoginUserDto, UserDto } from '../dtos/users.dto';
import { CreateEventDto, GenerateEventDto, UpdateEventDto } from '../dtos/events.dto';
import { userEvent } from '../interfaces/userEvent.interface';
import { City } from '../interfaces/cities.interfaces';
import fs from 'fs';
import { eventMessage } from '../interfaces/eventMessages.interface';

const knex = Knex({
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    multipleStatements: true,
  },
});

class DatabaseService {
  async importSQLDBQuery() {
    try {
      await knex<User>('user').first();
    } catch (e) {
      var sql = fs.readFileSync('./wandrBackend.session.sql').toString();
      return knex.raw(sql);
    }
    return true;
  }
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
        Username: userData.Username,
      },
      ['Fullname', 'Dob', 'Email', 'Gender', 'Password', 'Phone', 'Username'],
    );
  }
  async createUser(userData: CreateUserDto) {
    return await knex<User>('user').insert({
      Fullname: userData.Fullname,
      Dob: userData.Dob,
      Email: userData.Email,
      Gender: userData.Gender,
      Password: userData.Password,
      Phone: userData.Phone,
      Username: userData.Username,
    });
  }

  // function for search data from 2 tables to get events in 1 place: use inner join query
  async getAllEvents() {
    return await knex<Event>('event');
  }
  async findEventByID(eventid: number) {
    return await knex<Event>('event').where('EventId', eventid).first();
  }
  async findEventByPlace(placeName: string) {
    return await knex<Event>('event').where('place', placeName).first();
  }
  async updateEvent(eventID: number, eventData: Event): Promise<UpdateEventDto> {
    return await knex<Event>('event').where('EventId', eventID).update({
      EventId: eventData.EventId,
      Title: eventData.Title,
      EventStartTime: eventData.EventStartTime,
      EventEndTime: eventData.EventEndTime,
    });
  }
  async deleteEventByID(eventID: number) {
    return await knex<Event>('event').where('EventId', eventID).del();
  }
  async createEvent(eventData: GenerateEventDto): Promise<Event> {
    return await knex<Event>('event').insert({
      Title: eventData.Title,
      CreatedAt: eventData.CreatedAt,
      EventStartTime: eventData.EventStartTime,
      EventEndTime: eventData.EventEndTime,
      PlaceID: eventData.PlaceID,
      UserID: eventData.UserID,
    });
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
    return await knex<Place>('place').where('location', 'like', '%' + query + '%');
  }
  async showCitiesBySearchQuery(query: string) {
    return await knex<City>('city').where('name', 'like', '%' + query + '%');
  }
  async showEventByPlace(pid: number) {
    return await knex<Event>('event').select('*').innerJoin<Place>('place', 'event.PlaceID', 'place.PlaceID').where('event.PlaceId', pid);
  
  }
  async getNumberOfUsers(): Promise<number> {
    return await knex<User>('user').count({ id: 'ID' });
  }

  async createUser_Event(userid: number, eventid: number, timestamp: string) {
    return await knex('user_event').insert({
      EventId: eventid,
      UserID: userid,
      JoinedAt: timestamp,
    });
  }
  async getUser_EventByID(userEventID: number): Promise<userEvent> {
    return await knex<userEvent>('user_event').where('ID', userEventID).first();
  }
  async getUser_EventWithUserIDAndEventID(userID: number, eventID: number): Promise<userEvent> {
    return await knex<userEvent>('user_event')
      .where({
        EventId: eventID,
        UserID: userID,
      })
      .first();
  }
  async getEventsJoinedOfAUser(userid: number) {
    return await knex<Event>('event').select('event.*', 'place.Location').innerJoin<userEvent>('user_event', 'event.EventId', 'user_event.EventId').innerJoin('place','event.PlaceID','place.PlaceID').where('user_event.UserID', userid);
  }
  async showEventByPlaceInADate(pid: number, date: string) {//YYYY-MM-DD
    //convert date to datetime
    const mySQLDateFrom = date.concat(' 00:00:00');
    const mySQLDateTo = date.concat(' 23:59:59');
    return await knex<Event>('event').select('*').innerJoin<Place>('place', 'event.PlaceID', 'place.PlaceID').where('event.EventStartTime','>=', mySQLDateFrom).andWhere('event.EventEndTime','<=',mySQLDateTo).andWhere('event.PlaceId', pid);
  }
  async getAllEventMessages(eventID: number) {
    return await knex<eventMessage>('eventmessages').select('user.Username','user.Pfp','eventmessages.*').innerJoin<userEvent>('user_event', 'eventmessages.User_Event_ID', 'user_event.ID').innerJoin('user','user_event.UserID','user.ID').where('user_event.EventId', eventID).orderBy('time_stamp');//user event id or event id
    //also loads: user name and pfp
  }
}

export default DatabaseService;
