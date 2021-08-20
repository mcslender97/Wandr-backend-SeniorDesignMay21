"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
const database_service_1 = __importDefault(require("./database.service"));
class AuthService {
    constructor() {
        this.db = new database_service_1.default();
        this.users = users_model_1.default;
    }
    async signup(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.db.findUserByEmail(userData.Email);
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${userData.Email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.Password, 10);
        const createUserData = Object.assign(Object.assign({}, userData), { Password: hashedPassword });
        const createdUser = await this.db.createUser(createUserData);
        console.log(createdUser);
        return await this.db.findUserByID(createdUser[0]);
    }
    async login(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.db.findUserByEmail(userData.Email);
        if (!findUser)
            throw new HttpException_1.default(409, `You're email ${userData.Email} not found`);
        const isPasswordMatching = await bcrypt_1.default.compare(userData.Password, findUser.Password);
        if (!isPasswordMatching)
            throw new HttpException_1.default(409, "You're password not matching");
        const tokenData = this.createToken(findUser);
        const user = {
            Dob: findUser.Dob,
            Email: findUser.Email,
            Fullname: findUser.Fullname,
            Gender: findUser.Gender,
            ID: findUser.ID,
            Phone: findUser.Phone,
            token: tokenData,
        };
        return { user };
    }
    async logout(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = this.users.find(user => user.Password === userData.Password);
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        return findUser;
    }
    createToken(user) {
        const dataStoredInToken = { id: user.ID };
        const secret = process.env.JWT_SECRET;
        const expiresIn = 60 * 262800; //6 months in minutes
        return { expiresIn, token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }) };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map