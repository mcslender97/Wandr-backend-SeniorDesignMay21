"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_service_1 = __importDefault(require("../services/events.service"));
class EventsController {
    constructor() {
        this.eventService = new events_service_1.default();
        this.getEvents = async (req, res, next) => {
            try {
                const findAllEventsData = await this.eventService.findAllEvents();
                res.status(200).json(findAllEventsData);
                console.log("findAll");
            }
            catch (error) {
                next(error);
            }
        };
        this.getEventById = async (req, res, next) => {
            try {
                const eventId = Number(req.params.id);
                const findOneEventData = await this.eventService.findEventById(eventId);
                res.status(200).json(findOneEventData);
                console.log('findOne');
            }
            catch (error) {
                next(error);
            }
        };
        this.createEvent = async (req, res, next) => {
            try {
                const eventData = req.body;
                const userID = req.user.ID;
                const createEventData = await this.eventService.createEvent(userID, eventData);
                res.status(201).json(createEventData);
            }
            catch (error) {
                next(error);
            }
        };
        this.joinEvent = async (req, res, next) => {
            try {
                const userID = req.user.ID;
                const eventID = Number(req.params.id);
                const joinEventData = await this.eventService.joinEvent(userID, eventID);
                res.status(201).json(joinEventData);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateEvent = async (req, res, next) => {
            try {
                const eventId = Number(req.params.id);
                const eventData = req.body;
                const updateEventData = await this.eventService.updateEvent(eventId, eventData);
                res.status(200).json(updateEventData);
            }
            catch (error) {
                next(error);
            }
        };
        // public deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        //   try {
        //     const eventId = Number(req.params.id);
        //     const deleteEventData: Event[] = await this.eventService.deleteEvent(eventId);
        //     res.status(200).json({ data: deleteEventData, message: 'deleted' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        this.getAllEventMessages = async (req, res, next) => {
            try {
                const eventId = Number(req.params.id);
                const eventMessages = await this.eventService.loadAllEventMessages(eventId);
                res.status(200).json(eventMessages);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = EventsController;
//# sourceMappingURL=events.controller.js.map