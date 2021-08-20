"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const database_service_1 = __importDefault(require("../services/database.service"));
const authMiddleware = async (req, res, next) => {
    const db = new database_service_1.default();
    try {
        const headers = req.headers;
        if (headers && headers.authorization && headers.authorization.startsWith("Bearer ")) {
            const secret = process.env.JWT_SECRET;
            const verificationResponse = (await jsonwebtoken_1.default.verify(headers.authorization.replace(/Bearer /, ""), secret));
            const userId = verificationResponse.id;
            const findUser = await db.findUserByID(userId);
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new HttpException_1.default(401, 'Wrong authentication token'));
            }
        }
        else {
            next(new HttpException_1.default(404, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new HttpException_1.default(401, 'Wrong authentication token'));
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map