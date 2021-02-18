import mysql from 'mysql';
import config from '../config/config';

import Knex from 'knex';
import { User } from '../interfaces/users.interface';
import { Place } from '../interfaces/places.interface';
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
  async findPlaceByLocation(location: string) {
    return await knex<Place>('place').where('location', location);
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
}

export default DatabaseService;
