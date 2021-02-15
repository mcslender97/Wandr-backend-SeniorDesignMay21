import mysql from 'mysql';
import config from '../config/config';

import Knex from 'knex'; 
import { User } from '../interfaces/users.interface';
import { Place } from '../interfaces/places.interface';

const knex = Knex({
    client: 'mysql',
    connection: {
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    }
})

class DatabaseService {
    async findUserByID(id: number) {
        return await knex<User>('user').where("id", id).first();
    }
    async findPlaceByLocation(location: string){
        return await knex<Place>('place').where("location", location);
    }
    async findEventByPlace(place: Place){
        //return await knex<
        return await knex<Event>('event').where("place", place );
    }
    

}



export default DatabaseService;