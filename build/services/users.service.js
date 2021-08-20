"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const util_1 = require("../utils/util");
const database_service_1 = __importDefault(require("./database.service"));
class UserService {
    constructor() {
        this.db = new database_service_1.default();
        this.users = this.db.getAllUser();
    }
    async findAllUser() {
        //   const users: User[] = this.users;
        const users = await this.db.getAllUser();
        return users;
    }
    async findUserById(userId) {
        // const findUser: User = this.users.find(user => user.id === userId);
        const user = await this.db.findUserByID(userId);
        // if (!findUser) throw new HttpException(409, "You're not user");
        return user;
    }
    async findEventedJoinedOfUserById(userId) {
        //   const events: Event[] = this.events;
        const events = await this.db.getEventsJoinedOfAUser(userId);
        return events;
    }
    async createUser(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        // const findUser: User = (await this.db.getAllUser()).find(user => user.email === userData.email);
        const findUser = await this.db.findUserByEmail(userData.Email);
        if (!(findUser === null))
            throw new HttpException_1.default(409, `You're email ${userData.Email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.Password, 10);
        const createUserData = Object.assign(Object.assign({ ID: this.users.length + 1 }, userData), { Password: hashedPassword, Dob: null, Fullname: '', Gender: '', Phone: null, Email: '' });
        return createUserData;
    }
    async updateUser(userId, userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        // const findUser: User = this.users.find(user => user.id === userId);
        //const findUser: User = (await this.db.getAllUser()).find(user => user.id === userId);
        const findUser = await this.db.findUserByID(userId);
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        const hashedPassword = await bcrypt_1.default.hash(userData.Password, 10);
        // const updateUserData: User[] = this.users.map((user: User) => {
        //   if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword, dob: null,fullname: "",gender: "",phone: null,email: ""};
        //   return user;
        // });
        const updateUserData = await this.db.updateUserByID(userId, userData);
        return updateUserData;
    }
    async deleteUser(userId) {
        const findUser = this.users.find(user => user.id === userId);
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        const deleteUserData = this.users.filter((user) => user.id !== findUser.ID);
        return deleteUserData;
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map