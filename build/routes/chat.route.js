"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const chat_controller_1 = __importDefault(require("../controllers/chat.controller"));
class ChatRoute {
    constructor() {
        this.path = '/chat';
        this.router = express_1.Router();
        this.chatController = new chat_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use(`${this.path}`, auth_middleware_1.default);
        // this.router.get(`${this.path}`, this.usersController.getUsers);
        this.router.get(`${this.path}/:eventid(\\d+)`, this.chatController.getAllMessagesInAnEvent);
        // this.router.get(`${this.path}/joinedEvents`, this.usersController.getEventsJoinedByUser);
        // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
        // this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
    }
}
exports.default = ChatRoute;
//# sourceMappingURL=chat.route.js.map