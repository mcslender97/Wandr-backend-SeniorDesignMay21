"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const knex_1 = __importDefault(require("knex"));
const knex = knex_1.default({
    client: 'mysql',
    connection: {
        host: config_1.default.mysql.host,
        user: config_1.default.mysql.user,
        password: config_1.default.mysql.password,
        database: config_1.default.mysql.database
    }
});
class DatabaseService {
    async findUserByID(id) {
        return await knex('user').where("id", id).first();
    }
    async findPlaceByLocation(location) {
        return await knex('place').where("location", location);
    }
    // async findEventByPlace(place: Place){
    //     //return await knex<
    //     return await knex<Event>('event').where("place", place );
    // }
    async getAllUser() {
        return await knex('user');
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=database.service.js.map