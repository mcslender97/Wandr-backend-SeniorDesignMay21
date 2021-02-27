import mysql from 'mysql';
import config from '../config/config';

import Knex from 'knex';
import { User } from '../interfaces/users.interface';
import { Place } from '../interfaces/places.interface';
import { Event } from '../interfaces/events.interface';
import UsersController from '../controllers/users.controller';

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
    return await knex<User>('user').where('email', email).first();
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
  async updateUserByID(id: number, userData: User) {
    return await knex<User>('user').where('id', id).update(
      {
        fullname: userData.fullname,
        dob: userData.dob,
        email: userData.email,
        gender: userData.gender,
        password: userData.password,
        phone: userData.phone,
      },
      ['id', 'fullname', 'dob', 'email', 'gender', 'password', 'phone'],
    );
  }
  async createUser(id: number, userData: User) {
    return await knex<User>('user').insert(
      {
        fullname: userData.fullname,
        dob: userData.dob,
        email: userData.email,
        gender: userData.gender,
        password: userData.password,
        phone: userData.phone,
      },
      ['id', 'fullname', 'dob', 'email', 'gender', 'password', 'phone'],
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
  async getAllPlaces() {
    return await knex<Place>('place');
  }
  async findPlaceByID(id: number) {
    return await knex('place').where('PlaceID', id).first();
  }

  async findPlaceByLocation(location: string) {
    return await knex<Place>('place').where('location', location);
  }
  async showPlaceByLocationSearchQuery(query: string) {
    const regexQuery: string = query.concat('%');
    return await knex<Place>('place').where('location', 'like ', regexQuery);

  }
  async showEventByPlace(pid: number) {
    return await knex<Event>('event').select('*').innerJoin<Place>('place', 'event.PlaceID', 'place.PlaceID').where('event.PlaceId', pid);
    // return await knex<Event>('event').select('*').innerJoin('place', 'event.PlaceID', 'place.PlaceID').where('event.PlaceID', pid);
    //return await knex.raw('SELECT * FROM event INNER JOIN place on event.PlaceID = place.PlaceID where event.PlaceID = ?', pid);
  }
}

export default DatabaseService;
