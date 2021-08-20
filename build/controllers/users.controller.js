"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
class UsersController {
    constructor() {
        this.userService = new users_service_1.default();
        this.getUsers = async (req, res, next) => {
            try {
                const findAllUsersData = await this.userService.findAllUser();
                res.status(200).json(findAllUsersData);
                console.log('findAll');
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const findOneUserData = await this.userService.findUserById(userId);
                res.status(200).json(findOneUserData);
                console.log('findOne');
            }
            catch (error) {
                next(error);
            }
        };
        this.getEventsJoinedByUser = async (req, res, next) => {
            try {
                const userId = req.user.ID;
                const findOneUserJoinedEventData = await this.userService.findEventedJoinedOfUserById(userId);
                res.status(200).json(findOneUserJoinedEventData);
                console.log('findOne');
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const userData = req.body;
                const updateUserData = await this.userService.updateUser(userId, userData);
                res.status(200).json({ data: updateUserData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const deleteUserData = await this.userService.deleteUser(userId);
                res.status(200).json({ data: deleteUserData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map