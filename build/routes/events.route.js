"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = __importDefault(require("../controllers/events.controller"));
const events_dto_1 = require("../dtos/events.dto");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
class EventsRoute {
    constructor() {
        this.path = '/events';
        this.router = express_1.Router();
        this.eventsController = new events_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use(`${this.path}`, auth_middleware_1.default);
        this.router.get(`${this.path}`, this.eventsController.getEvents);
        this.router.get(`${this.path}/:id(\\d+)`, this.eventsController.getEventById);
        this.router.get(`${this.path}/:id(\\d+)/messagees`, this.eventsController.getAllEventMessages);
        this.router.post(`${this.path}`, validation_middleware_1.default(events_dto_1.CreateEventDto, 'body'), this.eventsController.createEvent);
        this.router.post(`${this.path}/:id(\\d+)/join`, validation_middleware_1.default(events_dto_1.CreateUserEventDto, 'body'), this.eventsController.joinEvent);
        this.router.put(`${this.path}/:id(\\d+)`, validation_middleware_1.default(events_dto_1.UpdateEventDto, 'body', true), this.eventsController.updateEvent);
        //     this.router.delete(`${this.path}/:id(\\d+)`, this.eventsController.deleteEvent);
    }
}
exports.default = EventsRoute;
//# sourceMappingURL=events.route.js.map