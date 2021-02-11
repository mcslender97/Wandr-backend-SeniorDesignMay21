import mysql from 'mysql';
import config from '../config/config';

import Knex from 'knex'; 
import { User } from '../interfaces/users.interface';

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
        return await knex<User>('users').where("id", id).first();
    }
    

}



export default DatabaseService;