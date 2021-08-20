"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const knex_1 = __importDefault(require("knex"));
const fs_1 = __importDefault(require("fs"));
const knex = knex_1.default({
    client: 'mysql',
    connection: {
        host: config_1.default.mysql.host,
        user: config_1.default.mysql.user,
        password: config_1.default.mysql.password,
        database: config_1.default.mysql.database,
        multipleStatements: true,
    },
});
class DatabaseService {
    async importSQLDBQuery() {
        try {
            await knex('user').first();
        }
        catch (e) {
            var sql = fs_1.default.readFileSync('./wandrBackend.session.sql').toString();
            return knex.raw(sql);
        }
        return true;
    }
    async findUserByID(id) {
        return await knex('user').where('id', id).first();
    }
    async findUserByEmail(email) {
        return await knex('user').where('Email', email).first();
    }
    // async findEventByPlace(place: Place){
    //     //return await knex<
    //     return await knex<Event>('event').where("place", place );
    // }
    async getAllUser() {
        return await knex('user');
    }
    async deleteUserByID(id) {
        await knex('user').where('id', id).del();
    }
    async updateUserByID(id, userData) {
        return await knex('user').where('id', id).update({
            Fullname: userData.Fullname,
            Dob: userData.Dob,
            Email: userData.Email,
            Gender: userData.Gender,
            Password: userData.Password,
            Phone: userData.Phone,
            Username: userData.Username,
        }, ['Fullname', 'Dob', 'Email', 'Gender', 'Password', 'Phone', 'Username']);
    }
    async createUser(userData) {
        return await knex('user').insert({
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
        return await knex('event');
    }
    async findEventByID(eventid) {
        return await knex('event').where('EventId', eventid).first();
    }
    async findEventByPlace(placeName) {
        return await knex('event').where('place', placeName).first();
    }
    async updateEvent(eventID, eventData) {
        return await knex('event').where('EventId', eventID).update({
            EventId: eventData.EventId,
            Title: eventData.Title,
            EventStartTime: eventData.EventStartTime,
            EventEndTime: eventData.EventEndTime,
        });
    }
    async deleteEventByID(eventID) {
        return await knex('event').where('EventId', eventID).del();
    }
    async createEvent(eventData) {
        return await knex('event').insert({
            Title: eventData.Title,
            CreatedAt: eventData.CreatedAt,
            EventStartTime: eventData.EventStartTime,
            EventEndTime: eventData.EventEndTime,
            PlaceID: eventData.PlaceID,
            UserID: eventData.UserID,
        });
    }
    async getAllPlaces() {
        return await knex('place');
    }
    async findPlaceByID(id) {
        return await knex('place').where('PlaceID', id).first();
    }
    async showPlaceByCityID(cityid) {
        return await knex('place').select('*').innerJoin('city', 'place.CityID', 'city.CityID').where('place.CityID', cityid);
    }
    async findPlaceByLocation(location) {
        return await knex('place').where('location', location);
    }
    async showPlaceByLocationSearchQuery(query) {
        return await knex('place').where('location', 'like', '%' + query + '%');
    }
    async showCitiesBySearchQuery(query) {
        return await knex('city').where('name', 'like', '%' + query + '%');
    }
    async showEventByPlace(pid) {
        return await knex('event').select('*').innerJoin('place', 'event.PlaceID', 'place.PlaceID').where('event.PlaceId', pid);
    }
    async getNumberOfUsers() {
        return await knex('user').count({ id: 'ID' });
    }
    async createUser_Event(userid, eventid, timestamp) {
        return await knex('user_event').insert({
            EventId: eventid,
            UserID: userid,
            JoinedAt: timestamp,
        });
    }
    async getUser_EventByID(userEventID) {
        return await knex('user_event').where('ID', userEventID).first();
    }
    async getUser_EventWithUserIDAndEventID(userID, eventID) {
        return await knex('user_event')
            .where({
            EventId: eventID,
            UserID: userID,
        })
            .first();
    }
    async getEventsJoinedOfAUser(userid) {
        return await knex('event').select('event.*', 'place.Location').innerJoin('user_event', 'event.EventId', 'user_event.EventId').innerJoin('place', 'event.PlaceID', 'place.PlaceID').where('user_event.UserID', userid);
    }
    async showEventByPlaceInADate(pid, date) {
        //convert date to datetime
        const mySQLDateFrom = date.concat(' 00:00:00');
        const mySQLDateTo = date.concat(' 23:59:59');
        return await knex('event').select('*').innerJoin('place', 'event.PlaceID', 'place.PlaceID').where('event.EventStartTime', '>=', mySQLDateFrom).andWhere('event.EventEndTime', '<=', mySQLDateTo).andWhere('event.PlaceId', pid);
    }
    async getAllEventMessages(eventID) {
        return await knex('eventmessages').select('user.Username', 'user.Pfp', 'eventmessages.*').innerJoin('user_event', 'eventmessages.User_Event_ID', 'user_event.ID').innerJoin('user', 'user_event.UserID', 'user.ID').where('user_event.EventId', eventID).orderBy('time_stamp'); //user event id or event id
        //also loads: user name and pfp
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=database.service.js.map