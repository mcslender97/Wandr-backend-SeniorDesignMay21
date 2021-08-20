"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const users_dto_1 = require("../dtos/users.dto");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
class UsersRoute {
    constructor() {
        this.path = '/user';
        this.router = express_1.Router();
        this.usersController = new users_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use(`${this.path}`, auth_middleware_1.default);
        this.router.get(`${this.path}`, this.usersController.getUsers);
        this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
        this.router.get(`${this.path}/joinedEvents`, this.usersController.getEventsJoinedByUser);
        this.router.put(`${this.path}/:id(\\d+)`, validation_middleware_1.default(users_dto_1.CreateUserDto, 'body', true), this.usersController.updateUser);
        this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
    }
}
exports.default = UsersRoute;
//# sourceMappingURL=users.route.js.map