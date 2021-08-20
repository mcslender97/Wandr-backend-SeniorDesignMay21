"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { CreateEventDto } from '../dtos/events.dto';
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const util_1 = require("../utils/util");
const database_service_1 = __importDefault(require("./database.service"));
class EventService {
    constructor() {
        this.date = new Date();
        this.db = new database_service_1.default();
        this.events = this.db.getAllEvents();
    }
    async findAllEvents() {
        //   const events: Event[] = this.events;
        const events = await this.db.getAllEvents();
        return events;
    }
    async loadAllEventMessages(EventId) {
        const messages = await this.db.getAllEventMessages(EventId);
        return messages; //give user event id or event id?
    }
    async findEventById(eventID) {
        const event = await this.db.findEventByID(eventID);
        // if (!findEvent) throw new HttpException(409, "No event found");
        return event;
    }
    async createEvent(userID, eventData) {
        if (util_1.isEmpty(eventData))
            throw new HttpException_1.default(400, "No event data");
        // const findEvent = await this.db.findEventByID(eventData.EventId); check if event is duplicate?
        // if (!(findEvent === null)) throw new HttpException(409, `You're Event already exists`);
        const place = await this.db.findPlaceByID(eventData.PlaceID);
        if (!place)
            throw new HttpException_1.default(404, "No place found!");
        const createEventData = Object.assign(Object.assign({}, eventData), { Title: [place.Name, "on", (eventData.EventStartTime).toString()].join(' '), CreatedAt: this.date.toJSON().slice(0, 19).replace('T', ' '), UserID: userID });
        if (createEventData.EventEndTime <= createEventData.EventStartTime) {
            throw new HttpException_1.default(422, "Event end date and time must be after event start date and time");
        }
        if (createEventData.EventStartTime <= createEventData.CreatedAt) {
            throw new HttpException_1.default(422, "Event start date must be before the current date and time");
        }
        const createEvent = await this.db.createEvent(createEventData);
        const joinCreatedEvent = await this.joinEvent(userID, createEvent[0]);
        if (!joinCreatedEvent)
            throw new HttpException_1.default(409, "Cannot add user to the created event, no event created.");
        console.log(joinCreatedEvent);
        return this.db.findEventByID(createEvent[0]);
    }
    async updateEvent(eventId, eventData) {
        if (util_1.isEmpty(eventData))
            throw new HttpException_1.default(400, "You're not eventData");
        const findEvent = await this.db.findEventByID(eventId);
        if (!findEvent)
            throw new HttpException_1.default(409, "You're not event");
        const updateEventData = await this.db.updateEvent(eventId, eventData);
        return updateEventData;
    }
    async deleteEvent(EventId) {
        const findEvent = await this.db.findEventByID(EventId);
        if (!findEvent)
            throw new HttpException_1.default(409, "You're not event");
        const deleteEventData = await this.db.deleteEventByID(EventId);
        if (deleteEventData === 0) {
            return false;
        }
        return true;
    }
    async joinEvent(UserID, EventId) {
        const findEvent = await this.db.findEventByID(EventId);
        //todo: check for duplicate event
        if (!findEvent)
            throw new HttpException_1.default(409, "You're not event");
        const findUserEvent = await this.db.getUser_EventWithUserIDAndEventID(UserID, EventId);
        if (findUserEvent)
            throw new HttpException_1.default(409, `You already joined the event`);
        const userEvent = await this.db.createUser_Event(UserID, EventId, this.date.toJSON().slice(0, 19).replace('T', ' '));
        return this.db.getUser_EventByID(userEvent[0]);
    }
}
exports.default = EventService;
//# sourceMappingURL=events.service.js.map