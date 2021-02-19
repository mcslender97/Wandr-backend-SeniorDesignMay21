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
    // public async findAllUser(): Promise<User[]> {
    //   const users: User[] = this.users;
    //   return users;
    // }
    async findUserById(userId) {
        // const findUser: User = this.users.find(user => user.id === userId);
        const user = await this.db.findUserByID(userId);
        // if (!findUser) throw new HttpException(409, "You're not user");
        return user;
    }
    async createUser(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = (await this.db.getAllUser()).find(user => user.email === userData.email);
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const createUserData = Object.assign(Object.assign({ id: this.users.length + 1 }, userData), { password: hashedPassword, dob: null, fullname: "", gender: "", phone: null, email: "" });
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
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const updateUserData = this.users.map((user) => {
            if (user.id === findUser.id)
                user = Object.assign(Object.assign({ id: userId }, userData), { password: hashedPassword, dob: null, fullname: "", gender: "", phone: null, email: "" });
            return user;
        });
        return updateUserData;
    }
    async deleteUser(userId) {
        const findUser = this.users.find(user => user.id === userId);
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        const deleteUserData = this.users.filter(user => user.id !== findUser.id);
        return deleteUserData;
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map